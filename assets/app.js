import { profile, proofPoints, projects, capabilities, stack, timeline } from './content.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

const sceneThemes = {
  launch: { accent: '#6f8cff', rgb: '111,140,255', sector: 'EARTH / 00' },
  intro: { accent: '#8da5ff', rgb: '141,165,255', sector: 'DEEP SPACE / 01' },
  signalboard: { accent: '#62f5e5', rgb: '98,245,229', sector: 'SYNTHESIS ORBIT / 02' },
  jobsignal: { accent: '#c7ff62', rgb: '199,255,98', sector: 'SIGNAL ARRAY / 03' },
  'document-intelligence': { accent: '#6f8cff', rgb: '111,140,255', sector: 'ARCHIVE MOON / 04' },
  meteorite: { accent: '#aa74ff', rgb: '170,116,255', sector: 'ASTEROID FIELD / 05' },
  'third-eye': { accent: '#62f5e5', rgb: '98,245,229', sector: 'TRADE NETWORK / 06' },
  'grain-segmentation': { accent: '#ff6bd6', rgb: '255,107,214', sector: 'MICROSCOPY WORLD / 07' },
  lab: { accent: '#7f9cff', rgb: '127,156,255', sector: 'ORBITAL LAB / 08' },
  payload: { accent: '#62f5e5', rgb: '98,245,229', sector: 'CARGO BAY / 09' },
  log: { accent: '#aa74ff', rgb: '170,116,255', sector: 'ARCHIVE / 10' },
  contact: { accent: '#c7ff62', rgb: '199,255,98', sector: 'HOME SIGNAL / 11' }
};

const missionMeta = {
  signalboard: { route: 'Signalboard', code: 'MISSION 01', side: 'right' },
  jobsignal: { route: 'JobSignal', code: 'MISSION 02', side: 'left' },
  'document-intelligence': { route: 'Document AI', code: 'MISSION 03', side: 'right' },
  meteorite: { route: 'Meteorite', code: 'MISSION 04', side: 'left' },
  'third-eye': { route: 'Third Eye', code: 'MISSION 05', side: 'right' },
  'grain-segmentation': { route: 'Grain research', code: 'MISSION 06', side: 'left' }
};

function bindProfile() {
  $('#profile-status').textContent = profile.status;
  $('#profile-intro').textContent = profile.intro;
  $('#profile-email').textContent = profile.email;
  $('#profile-phone').textContent = profile.phoneDisplay;
  $('#contact-email').textContent = profile.email;
  $('#contact-phone').textContent = profile.phoneDisplay;
  $('#profile-availability').textContent = profile.availability;

  $$('[data-profile-link]').forEach((element) => {
    const type = element.dataset.profileLink;
    const links = {
      github: profile.github,
      linkedin: profile.linkedin,
      resume: profile.resume,
      email: `mailto:${profile.email}`,
      phone: `tel:${profile.phoneHref}`
    };
    if (links[type]) element.href = links[type];
  });

  $('#launch-proof').innerHTML = proofPoints.map((item) => `
    <div><b>${item.value}</b><span>${item.label}</span></div>
  `).join('');
}

function grainCells() {
  const palette = ['#6f8cff', '#62f5e5', '#c7ff62', '#ff6bd6', '#aa74ff', '#28345e'];
  return Array.from({ length: 64 }, (_, index) => {
    const color = palette[(index * 7 + Math.floor(index / 8) * 3) % palette.length];
    const opacity = (0.45 + ((index * 13) % 45) / 100).toFixed(2);
    const delay = `${-((index * 0.13) % 4).toFixed(2)}s`;
    return `<i class="grain-cell" style="--cell:${color};--op:${opacity};--delay:${delay}"></i>`;
  }).join('');
}

function visualMarkup(project, includeLabel = true) {
  const label = includeLabel ? `<span class="celestial__label">${missionMeta[project.id].code} // ${project.source}</span>` : '';

  if (project.id === 'signalboard') {
    return `<div class="celestial celestial--signalboard">
      <div class="signal-station">
        <i class="signal-link"></i><i class="signal-link signal-link--b"></i><i class="signal-link signal-link--c"></i>
        <span class="signal-node signal-node--1"></span><span class="signal-node signal-node--2"></span><span class="signal-node signal-node--3"></span><span class="signal-node signal-node--4"></span>
        <div class="signal-station__core"><span>HUMAN<br>REVIEW</span></div>
      </div>${label}
    </div>`;
  }

  if (project.id === 'jobsignal') {
    return `<div class="celestial celestial--jobsignal">
      <div class="radar-world">
        <div class="radar-world__grid"></div>
        <i class="radar-ping radar-ping--1"></i><i class="radar-ping radar-ping--2"></i><i class="radar-ping radar-ping--3"></i>
      </div>
      <div class="radar-satellite"><i></i><i></i></div>${label}
    </div>`;
  }

  if (project.id === 'document-intelligence') {
    return `<div class="celestial celestial--documents">
      <div class="archive-world"></div>
      <span class="archive-doc archive-doc--1"></span><span class="archive-doc archive-doc--2"></span><span class="archive-doc archive-doc--3"></span><span class="archive-doc archive-doc--4"></span>
      <div class="archive-route"><i></i></div>${label}
    </div>`;
  }

  if (project.id === 'meteorite') {
    return `<div class="celestial celestial--meteorite">
      <div class="meteor-trail"></div>
      <div class="meteor-world">
        <i class="meteor-crater meteor-crater--1"></i><i class="meteor-crater meteor-crater--2"></i><i class="meteor-crater meteor-crater--3"></i><i class="meteor-crater meteor-crater--4"></i>
      </div>
      <div class="meteor-scan"><i></i></div>${label}
    </div>`;
  }

  if (project.id === 'third-eye') {
    return `<div class="celestial celestial--procurement">
      <div class="procurement-world">
        <i class="procurement-orbit"></i><i class="procurement-orbit procurement-orbit--b"></i>
        <i class="procurement-line"></i><i class="procurement-line procurement-line--b"></i><i class="procurement-line procurement-line--c"></i>
        <span class="procurement-card procurement-card--1"></span><span class="procurement-card procurement-card--2"></span><span class="procurement-card procurement-card--3"></span><span class="procurement-card procurement-card--4"></span>
        <div class="procurement-core"><span>VALIDATE</span></div>
      </div>${label}
    </div>`;
  }

  return `<div class="celestial celestial--grains">
    <div class="grain-world"><div class="grain-grid">${grainCells()}</div><div class="grain-scan"></div></div>
    <div class="grain-readout"><b>0.94+</b>MIOU<br>18,996 GRAINS<br>6 CHANNELS</div>${label}
  </div>`;
}

function projectMissionMarkup(project, index) {
  const meta = missionMeta[project.id];
  const theme = sceneThemes[project.id];
  const links = [
    project.repo ? `<a href="${project.repo}" target="_blank" rel="noreferrer">Repository ↗</a>` : '',
    project.live ? `<a href="${project.live}" target="_blank" rel="noreferrer">Live product ↗</a>` : ''
  ].filter(Boolean).join('');

  return `<section class="chapter project-mission is-${meta.side}" id="mission-${project.id}"
    data-route="${meta.route}" data-sector="${theme.sector}" data-scene="${project.id}"
    style="--scene-accent:${theme.accent};--scene-accent-rgb:${theme.rgb}">
    ${visualMarkup(project)}
    <article class="project-panel reveal tilt-card" data-project-id="${project.id}">
      <div class="project-panel__scan"></div>
      <div class="project-panel__screen">
        <div class="project-panel__top"><span>${meta.code} // ${project.type}</span><span>${String(index + 1).padStart(2, '0')} / 06</span></div>
        <h2>${project.title}</h2>
        <p class="project-panel__summary">${project.short}</p>
        <div class="project-panel__metrics">${project.metrics.slice(0, 3).map((metric) => `<div><b>${metric.value}</b><span>${metric.label}</span></div>`).join('')}</div>
        <div class="project-panel__tags">${project.tags.slice(0, 6).map((tag) => `<span>${tag}</span>`).join('')}</div>
        <div class="project-panel__actions">
          <button type="button" class="magnetic" data-open-project="${project.id}"><i>↗</i>Open mission brief</button>
          <div class="project-panel__links">${links}</div>
        </div>
      </div>
    </article>
  </section>`;
}

function renderContent() {
  $('#project-missions').innerHTML = projects.map(projectMissionMarkup).join('');

  $('#capabilities').innerHTML = capabilities.map((capability) => `
    <article class="capability-card reveal">
      <small>${capability.number}</small>
      <h3>${capability.title}</h3>
      <p>${capability.body}</p>
    </article>
  `).join('');

  $('#stack-table').innerHTML = stack.map((group, index) => `
    <article class="payload-group reveal">
      <small>MODULE ${String(index + 1).padStart(2, '0')}</small>
      <h3>${group.label}</h3>
      <ul>${group.items.map((item) => `<li>${item}</li>`).join('')}</ul>
      <div class="payload-group__meter"><i style="--fill:${68 + index * 6}%"></i></div>
    </article>
  `).join('');

  $('#timeline').innerHTML = timeline.map((entry, index) => `
    <article class="log-entry reveal">
      <span class="log-entry__year">${entry.years}</span>
      <h3>${entry.title}</h3>
      <h4>${entry.place}</h4>
      <p>${entry.note}</p>
      <span class="log-entry__orbit">${String(index + 1).padStart(2, '0')}</span>
    </article>
  `).join('');
}

function initializeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  $$('.reveal').forEach((element) => observer.observe(element));
}

function setupPreflight() {
  const preflight = $('#preflight');
  const fill = $('#preflight-fill');
  const percent = $('#preflight-percent');
  const message = $('#preflight-message');
  const messages = [
    [0, 'Calibrating star map'],
    [24, 'Checking mission telemetry'],
    [49, 'Loading project coordinates'],
    [73, 'Igniting navigation systems'],
    [92, 'Launch window confirmed']
  ];

  if (reducedMotion) {
    preflight.remove();
    document.body.classList.remove('is-preflight');
    return;
  }

  const start = performance.now();
  const duration = 2350;
  let finished = false;

  function complete() {
    if (finished) return;
    finished = true;
    fill.style.transform = 'scaleX(1)';
    percent.textContent = '100%';
    message.textContent = 'Launch window confirmed';
    setTimeout(() => {
      document.body.classList.remove('is-preflight');
      preflight.classList.add('is-complete');
      setTimeout(() => preflight.remove(), 900);
    }, 260);
  }

  function tick(now) {
    const progress = clamp((now - start) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * 100);
    fill.style.transform = `scaleX(${eased})`;
    percent.textContent = `${String(value).padStart(2, '0')}%`;
    const current = [...messages].reverse().find(([threshold]) => value >= threshold);
    if (current) message.textContent = current[1];
    if (progress < 1) requestAnimationFrame(tick);
    else complete();
  }

  requestAnimationFrame(tick);
  preflight.addEventListener('click', complete, { once: true });
  setTimeout(complete, 3600);
}

function setupMenu() {
  const menu = $('#mobile-menu');
  const toggle = $('#menu-toggle');
  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const next = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', next);
    menu.setAttribute('aria-hidden', String(!next));
    toggle.setAttribute('aria-expanded', String(next));
  });
  $$('[data-menu-close]').forEach((element) => element.addEventListener('click', close));
}

function setupProjectModal() {
  const modal = $('#mission-modal');
  const projectById = new Map(projects.map((project) => [project.id, project]));
  let previousFocus = null;

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previousFocus) previousFocus.focus();
  };

  const open = (projectId, trigger) => {
    const project = projectById.get(projectId);
    if (!project) return;
    const meta = missionMeta[project.id];
    const theme = sceneThemes[project.id];
    previousFocus = trigger;

    $('#modal-code').textContent = `${meta.code} // ${project.type} // ${project.year}`;
    $('#modal-title').textContent = project.title;
    $('#modal-summary').textContent = project.short;
    $('#modal-metrics').innerHTML = project.metrics.map((metric) => `<div><b>${metric.value}</b><span>${metric.label}</span></div>`).join('');
    $('#modal-details').innerHTML = project.details.map((detail) => `<li>${detail}</li>`).join('');
    $('#modal-tags').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
    $('#modal-actions').innerHTML = [
      project.repo ? `<a class="action action--primary" href="${project.repo}" target="_blank" rel="noreferrer">Open repository <span>↗</span></a>` : '',
      project.live ? `<a class="action action--ghost" href="${project.live}" target="_blank" rel="noreferrer">Open live product <span>↗</span></a>` : ''
    ].join('');
    $('#modal-visual').innerHTML = visualMarkup(project, false);
    modal.style.setProperty('--scene-accent', theme.accent);
    modal.style.setProperty('--scene-accent-rgb', theme.rgb);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.mission-modal__close').focus();
  };

  $$('[data-open-project]').forEach((button) => button.addEventListener('click', () => open(button.dataset.openProject, button)));
  $$('[data-close-modal]').forEach((element) => element.addEventListener('click', close));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
}

function setupRouteAndScenes() {
  const routeMap = $('#route-map');
  const chapters = $$('.chapter');
  routeMap.innerHTML = chapters.map((chapter, index) => `
    <a href="#${chapter.id}" data-route-index="${index}"><span>${chapter.dataset.route}</span></a>
  `).join('');

  const routeLinks = $$('a', routeMap);
  let activeIndex = 0;
  let previousY = window.scrollY;
  let rawVelocity = 0;
  let smoothVelocity = 0;
  let scrollProgress = 0;
  let activeTheme = sceneThemes.launch;
  let targetTheme = { r: 111, g: 140, b: 255 };
  let currentTheme = { ...targetTheme };
  const spacecraft = $('#spacecraft');
  const hudSector = $('#hud-sector');
  const hudVelocity = $('#hud-velocity');
  const hudTitle = $('#hud-title');
  const missionBar = $('#mission-bar');

  window.__missionState = {
    get velocity() { return smoothVelocity; },
    get progress() { return scrollProgress; },
    get theme() { return currentTheme; },
    get activeIndex() { return activeIndex; },
    chapters
  };

  function applyScene(index) {
    if (index === activeIndex && routeLinks[index]?.classList.contains('is-active')) return;
    activeIndex = index;
    const chapter = chapters[index];
    const scene = chapter.dataset.scene;
    activeTheme = sceneThemes[scene] || sceneThemes.launch;
    const [r, g, b] = activeTheme.rgb.split(',').map(Number);
    targetTheme = { r, g, b };
    document.documentElement.style.setProperty('--scene-accent', activeTheme.accent);
    document.documentElement.style.setProperty('--scene-accent-rgb', activeTheme.rgb);
    routeLinks.forEach((link, routeIndex) => link.classList.toggle('is-active', routeIndex === index));
    hudSector.textContent = chapter.dataset.sector || activeTheme.sector;
    hudTitle.textContent = chapter.dataset.route.toUpperCase();
  }

  function update() {
    const currentY = window.scrollY;
    rawVelocity = currentY - previousY;
    previousY = currentY;
    smoothVelocity = lerp(smoothVelocity, rawVelocity, 0.12);
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress = clamp(currentY / maxScroll, 0, 1);
    missionBar.classList.toggle('is-scrolled', currentY > 40);

    const center = window.innerHeight * 0.5;
    let closest = 0;
    let closestDistance = Infinity;
    chapters.forEach((chapter, index) => {
      const rect = chapter.getBoundingClientRect();
      const distance = Math.abs((rect.top + rect.height * 0.5) - center);
      if (distance < closestDistance) {
        closest = index;
        closestDistance = distance;
      }

      const local = clamp((center - rect.top) / Math.max(rect.height, 1), 0, 1);
      const celestial = $('.celestial', chapter);
      if (celestial && !reducedMotion) {
        const direction = chapter.classList.contains('is-right') ? -1 : 1;
        const shift = (local - 0.5) * 7 * direction;
        const scale = 0.93 + Math.sin(local * Math.PI) * 0.08;
        celestial.style.translate = `0 ${shift}%`;
        celestial.style.scale = scale;
      }
    });
    applyScene(closest);

    currentTheme.r = lerp(currentTheme.r, targetTheme.r, 0.035);
    currentTheme.g = lerp(currentTheme.g, targetTheme.g, 0.035);
    currentTheme.b = lerp(currentTheme.b, targetTheme.b, 0.035);

    if (!reducedMotion) {
      const launchFactor = clamp(currentY / Math.max(window.innerHeight, 1), 0, 1);
      const x = 50 + Math.sin(scrollProgress * Math.PI * 6.2) * (window.innerWidth < 700 ? 18 : 25);
      const baseY = lerp(82, 48, launchFactor);
      const y = baseY + Math.cos(scrollProgress * Math.PI * 4.5) * (window.innerWidth < 700 ? 6 : 9);
      const tangent = Math.cos(scrollProgress * Math.PI * 6.2) * 22;
      const velocityTilt = clamp(smoothVelocity * 0.9, -28, 28);
      const rotation = tangent + velocityTilt;
      const speedScale = 1 + clamp(Math.abs(smoothVelocity) / 70, 0, .35);
      spacecraft.style.transform = `translate3d(calc(${x}vw - 50%),calc(${y}vh - 50%),0) rotate(${rotation}deg) scale(${speedScale})`;
      spacecraft.style.opacity = currentY < 20 ? '.72' : '1';
    }

    const shownVelocity = Math.round(clamp(Math.abs(smoothVelocity) * 72, 0, 999));
    hudVelocity.textContent = `${String(shownVelocity).padStart(3, '0')} KM/S`;
    requestAnimationFrame(update);
  }

  applyScene(0);
  requestAnimationFrame(update);
  return { chapters, getActiveIndex: () => activeIndex };
}

function setupCosmos() {
  const canvas = $('#cosmos');
  const context = canvas.getContext('2d', { alpha: false });
  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars = [];
  let mouseX = 0;
  let mouseY = 0;
  let lastTime = performance.now();

  function resetStar(star, randomDepth = true) {
    star.x = (Math.random() - 0.5) * width * 2.2;
    star.y = (Math.random() - 0.5) * height * 2.2;
    star.z = randomDepth ? Math.random() * width + 1 : width;
    star.size = Math.random() * 1.4 + 0.25;
    star.alpha = Math.random() * .75 + .2;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 700 ? 140 : 310;
    stars = Array.from({ length: count }, () => {
      const star = {};
      resetStar(star, true);
      return star;
    });
  }

  function nebula(rgb, progress) {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(Math.round);
    context.fillStyle = '#030611';
    context.fillRect(0, 0, width, height);

    const px = width * (0.55 + Math.sin(progress * Math.PI * 3) * .16) + mouseX * 18;
    const py = height * (0.42 + Math.cos(progress * Math.PI * 2) * .12) + mouseY * 12;
    const glow = context.createRadialGradient(px, py, 0, px, py, Math.max(width, height) * .68);
    glow.addColorStop(0, `rgba(${r},${g},${b},.17)`);
    glow.addColorStop(.32, `rgba(${r},${g},${b},.07)`);
    glow.addColorStop(1, 'rgba(3,6,17,0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const secondary = context.createRadialGradient(width * .08, height * .82, 0, width * .08, height * .82, Math.max(width, height) * .48);
    secondary.addColorStop(0, 'rgba(24,222,191,.06)');
    secondary.addColorStop(1, 'rgba(3,6,17,0)');
    context.fillStyle = secondary;
    context.fillRect(0, 0, width, height);
  }

  function draw(now) {
    const state = window.__missionState || { velocity: 0, progress: 0, theme: { r: 111, g: 140, b: 255 } };
    const delta = Math.min((now - lastTime) / 16.67, 3);
    lastTime = now;
    nebula(state.theme, state.progress);

    const centerX = width / 2 + mouseX * 18;
    const centerY = height / 2 + mouseY * 12;
    const warp = clamp(Math.abs(state.velocity) / 22, 0, 1);
    const speed = reducedMotion ? 0 : (1.1 + warp * 20 + (document.body.classList.contains('is-preflight') ? 2.8 : 0)) * delta;
    const direction = state.velocity < -0.5 ? -0.4 : 1;

    for (const star of stars) {
      const previousZ = star.z;
      star.z -= speed * direction;
      if (star.z < 1 || star.z > width * 1.4) resetStar(star, direction < 0);

      const scale = 190 / star.z;
      const x = star.x * scale + centerX;
      const y = star.y * scale + centerY;
      const previousScale = 190 / previousZ;
      const previousX = star.x * previousScale + centerX;
      const previousY = star.y * previousScale + centerY;
      if (x < -80 || x > width + 80 || y < -80 || y > height + 80) {
        resetStar(star, false);
        continue;
      }

      const radius = clamp(star.size * scale * .9, .2, 2.4 + warp * 1.2);
      context.beginPath();
      context.strokeStyle = `rgba(210,224,255,${star.alpha * (.45 + warp * .5)})`;
      context.lineWidth = radius;
      context.moveTo(x, y);
      context.lineTo(lerp(x, previousX, 1 + warp * 8), lerp(y, previousY, 1 + warp * 8));
      context.stroke();
      if (warp < .3) {
        context.beginPath();
        context.fillStyle = `rgba(235,242,255,${star.alpha})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('pointermove', (event) => {
    mouseX = (event.clientX / Math.max(width, 1) - .5) * 2;
    mouseY = (event.clientY / Math.max(height, 1) - .5) * 2;
  }, { passive: true });
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
}

function setupAutopilot(routeState) {
  const buttons = [$('#autopilot'), $('#launch-autopilot')];
  let active = false;
  let timer = null;
  let currentTarget = 0;

  function setUi() {
    const headerButton = $('#autopilot');
    headerButton.setAttribute('aria-pressed', String(active));
    $('small', headerButton).textContent = active ? 'ON' : 'OFF';
    $('#launch-autopilot').innerHTML = active ? 'Stop cinematic mode <span>■</span>' : 'Watch cinematic mode <span>▶</span>';
  }

  function stop() {
    active = false;
    clearTimeout(timer);
    timer = null;
    setUi();
  }

  function goNext() {
    if (!active) return;
    const chapters = routeState.chapters;
    const index = Math.max(currentTarget, routeState.getActiveIndex());
    const next = Math.min(index + 1, chapters.length - 1);
    currentTarget = next;
    chapters[next].scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    if (next >= chapters.length - 1) {
      timer = setTimeout(stop, 6500);
      return;
    }
    timer = setTimeout(goNext, next >= 2 && next <= 7 ? 6000 : 4700);
  }

  function toggle() {
    active = !active;
    clearTimeout(timer);
    setUi();
    if (active) {
      currentTarget = routeState.getActiveIndex();
      timer = setTimeout(goNext, 550);
    }
  }

  buttons.forEach((button) => button.addEventListener('click', toggle));
  ['wheel', 'touchstart'].forEach((eventName) => window.addEventListener(eventName, () => {
    if (active) stop();
  }, { passive: true }));
  window.addEventListener('keydown', (event) => {
    if (active && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) stop();
  });
  setUi();
}

function setupInteractions() {
  if (!coarsePointer) {
    const cursor = $('#cursor');
    const dot = $('#cursor-dot');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cursorX = x;
    let cursorY = y;
    document.body.classList.add('has-cursor');

    window.addEventListener('pointermove', (event) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.transform = `translate3d(${x - 2}px,${y - 2}px,0)`;
    }, { passive: true });

    function moveCursor() {
      cursorX = lerp(cursorX, x, .18);
      cursorY = lerp(cursorY, y, .18);
      cursor.style.transform = `translate3d(${cursorX - 20}px,${cursorY - 20}px,0)`;
      requestAnimationFrame(moveCursor);
    }
    requestAnimationFrame(moveCursor);

    $$('a,button,.tilt-card').forEach((element) => {
      element.addEventListener('pointerenter', () => document.body.classList.add('cursor-active'));
      element.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
    });

    $$('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const mx = event.clientX - rect.left - rect.width / 2;
        const my = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${mx * .12}px,${my * .12}px)`;
      });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });

    $$('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(1100px) rotateX(${-py * 5}deg) rotateY(${px * 7}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
}

function setupAnchorBehavior() {
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      const target = $(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });
}

bindProfile();
renderContent();
setupPreflight();
setupMenu();
setupProjectModal();
initializeReveal();
setupCosmos();
const routeState = setupRouteAndScenes();
setupAutopilot(routeState);
setupInteractions();
setupAnchorBehavior();

if (!location.hash) window.scrollTo(0, 0);
