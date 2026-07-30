import {
  profile,
  proofPoints,
  projects,
  capabilities,
  stack,
  timeline,
  achievements
} from './content.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function setProfileContent() {
  qs('#profile-status').textContent = profile.status;
  qs('#profile-intro').textContent = profile.intro;
  qs('#profile-statement').textContent = profile.statement;
  qs('#profile-email').textContent = profile.email;
  qs('#profile-phone').textContent = profile.phoneDisplay;
  qs('#contact-email').textContent = profile.email;
  qs('#contact-phone').textContent = profile.phoneDisplay;
  qs('#profile-availability').textContent = profile.availability;
  qs('#current-year').textContent = new Date().getFullYear();

  qsa('[data-profile-link]').forEach((link) => {
    const key = link.dataset.profileLink;
    const hrefMap = {
      github: profile.github,
      linkedin: profile.linkedin,
      resume: profile.resume,
      email: `mailto:${profile.email}`,
      phone: `tel:${profile.phoneHref}`
    };
    link.href = hrefMap[key] || '#';
  });
}

function renderProofPoints() {
  qs('#hero-metrics').innerHTML = proofPoints.map((item) => `
    <div class="console__metric">
      <b>${escapeHtml(item.value)}</b>
      <span>${escapeHtml(item.label)}</span>
    </div>
  `).join('');
}

function renderCapabilities() {
  qs('#capabilities').innerHTML = capabilities.map((item, index) => `
    <article class="capability reveal">
      <span class="capability__number">${escapeHtml(item.number)}</span>
      <span class="capability__icon" aria-hidden="true">${['SYS', 'AI', 'E2E'][index] || 'ST'}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `).join('');
}

function renderAchievements() {
  qs('#achievements').innerHTML = achievements.map((item) => `
    <article class="achievement reveal">
      <div class="achievement__value">${escapeHtml(item.value)}</div>
      <div class="achievement__line"></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `).join('');
}

function renderStack() {
  qs('#stack-table').innerHTML = stack.map((group) => `
    <div class="stack-row reveal">
      <h3>${escapeHtml(group.label)}</h3>
      <div class="stack-chips">
        ${group.items.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderTimeline() {
  qs('#timeline').innerHTML = timeline.map((item) => `
    <article class="timeline-item reveal">
      <span class="timeline-item__years">${escapeHtml(item.years)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <h4>${escapeHtml(item.place)}</h4>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join('');
}

function visualMarkup(type) {
  if (type === 'signalboard') {
    return `
      <div class="visual visual-signalboard">
        <div class="v-window">
          <div class="v-window__bar"><i></i><i></i><i></i></div>
          <div class="v-signal-layout">
            <div class="v-signal-nav"><span></span><span></span><span></span><span></span><span></span></div>
            <div class="v-signal-main">
              <div class="v-signal-title"></div>
              <div class="v-signal-cards"><span></span><span></span><span></span></div>
              <div class="v-signal-chart"></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  if (type === 'jobsignal') {
    return `
      <div class="visual visual-jobsignal">
        <div class="v-terminal">
          <div class="v-terminal__bar"><span>CMD//SIGNAL</span><span>FIT LAB ONLINE</span></div>
          <div class="v-terminal__body">
            <div class="v-signal-list">
              ${[1,2,3,4].map(() => '<div class="v-job-row"><strong></strong><span></span></div>').join('')}
            </div>
            <div class="v-fitlab"><div class="v-fit-score"><span>87</span></div><i></i><i></i><i></i><i></i></div>
          </div>
        </div>
      </div>`;
  }

  if (type === 'documents') {
    return `
      <div class="visual visual-documents">
        <div class="v-docs"><div class="v-doc v-doc--a"></div><div class="v-doc v-doc--b"></div><div class="v-doc v-doc--c"></div></div>
        <div class="v-pipeline">${Array.from({length: 13}, () => '<span></span>').join('')}</div>
      </div>`;
  }

  if (type === 'meteorite') {
    return `
      <div class="visual visual-meteorite">
        <div class="v-meteor"></div>
        <div class="v-meteor-readout">COMPOSITION<b>62.4%</b>SILICATE RICH</div>
      </div>`;
  }

  if (type === 'procurement') {
    return `
      <div class="visual visual-procurement">
        <div class="v-procurement">
          <div class="v-proc-card"><b></b><span></span><span></span><i>01</i></div>
          <div class="v-proc-card"><b></b><span></span><span></span><i>02</i></div>
          <div class="v-proc-card"><b></b><span></span><span></span><i>03</i></div>
        </div>
      </div>`;
  }

  const grains = [
    [3,4,29,26,'#436bff'],[27,0,25,30,'#42e8c5'],[50,3,31,27,'#c8ff4d'],[77,0,27,32,'#7b5cff'],
    [0,27,31,27,'#ff7a45'],[29,25,27,31,'#436bff'],[54,27,25,26,'#42e8c5'],[76,29,27,28,'#c8ff4d'],
    [1,52,25,31,'#7b5cff'],[24,55,31,27,'#ff7a45'],[53,52,29,32,'#436bff'],[79,55,26,27,'#42e8c5'],
    [0,80,31,24,'#c8ff4d'],[29,79,24,28,'#7b5cff'],[51,82,30,23,'#ff7a45'],[77,80,27,26,'#436bff']
  ];
  return `
    <div class="visual visual-grains">
      <div class="v-grain-map">
        ${grains.map(([x,y,w,h,c], index) => `<span style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;background:${c};animation-delay:${index * 0.11}s"></span>`).join('')}
      </div>
    </div>`;
}

function projectCategory(project) {
  if (project.repo) return ['All', 'GitHub', project.type.includes('AI') ? 'AI' : null, project.type.includes('ML') ? 'Research' : null].filter(Boolean);
  if (project.type.includes('Research') || project.source.includes('thesis')) return ['All', 'Research', 'AI'];
  return ['All', 'AI'];
}

function renderProjects() {
  qs('#projects').innerHTML = projects.map((project) => `
    <article class="project-card" data-project-id="${escapeHtml(project.id)}" data-categories="${projectCategory(project).join(',')}">
      <button class="project-card__button" type="button" aria-label="Open details for ${escapeHtml(project.title)}">
        <div class="project-card__visual">${visualMarkup(project.visual)}</div>
        <div class="project-card__top">
          <span class="project-card__source">${escapeHtml(project.source)}</span>
          <span class="project-card__index">${escapeHtml(project.index)}</span>
        </div>
        <div class="project-card__content">
          <div class="project-card__meta"><span>${escapeHtml(project.type)}</span><span>${escapeHtml(project.year)}</span></div>
          <h3>${escapeHtml(project.title)}</h3>
          <p class="project-card__summary">${escapeHtml(project.short)}</p>
          <div class="project-card__foot">
            <div class="project-card__tags">${project.tags.slice(0,4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
            <span class="project-card__open" aria-hidden="true">+</span>
          </div>
        </div>
      </button>
    </article>
  `).join('');

  qsa('.project-card__button').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      const project = projects.find((item) => item.id === card.dataset.projectId);
      if (project) openProject(project);
    });
  });
}

function initFilters() {
  const chips = qsa('.filter-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((item) => item.classList.toggle('is-active', item === chip));
      const selected = chip.dataset.filter;
      qsa('.project-card').forEach((card) => {
        const categories = card.dataset.categories.split(',');
        card.classList.toggle('is-hidden', selected !== 'All' && !categories.includes(selected));
      });
    });
  });
}

function openProject(project) {
  const modal = qs('#project-modal');
  qs('#modal-visual').innerHTML = visualMarkup(project.visual);
  qs('#modal-type').textContent = project.type;
  qs('#modal-source').textContent = project.source;
  qs('#modal-year').textContent = project.year;
  qs('#modal-title').textContent = project.title;
  qs('#modal-short').textContent = project.short;
  qs('#modal-metrics').innerHTML = project.metrics.map((metric) => `
    <div class="modal__metric"><b>${escapeHtml(metric.value)}</b><span>${escapeHtml(metric.label)}</span></div>
  `).join('');
  qs('#modal-details').innerHTML = project.details.map((detail) => `<p>${escapeHtml(detail)}</p>`).join('');
  qs('#modal-tags').innerHTML = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');

  const actions = [];
  if (project.repo) {
    actions.push(`<a class="button button--accent magnetic" href="${escapeHtml(project.repo)}" target="_blank" rel="noreferrer">View repository <span aria-hidden="true">&#8599;</span></a>`);
  }
  if (project.live) {
    actions.push(`<a class="button button--outline magnetic" href="${escapeHtml(project.live)}" target="_blank" rel="noreferrer">Open live product <span aria-hidden="true">&#8599;</span></a>`);
  }
  if (!project.repo) {
    actions.push(`<a class="button button--outline magnetic" href="${escapeHtml(profile.resume)}" target="_blank" rel="noreferrer">View CV case study <span aria-hidden="true">&#8599;</span></a>`);
  }
  qs('#modal-actions').innerHTML = actions.join('');

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  qs('.modal__close').focus();
  initMagnetic(qs('#modal-actions'));
}

function closeProject() {
  const modal = qs('#project-modal');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
}

function initModal() {
  qsa('[data-modal-close]').forEach((button) => button.addEventListener('click', closeProject));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && qs('#project-modal').classList.contains('is-open')) closeProject();
  });
}

function initReveal() {
  const targets = qsa('.reveal, .project-card');
  if (reduceMotion) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  targets.forEach((target) => observer.observe(target));
}

function initBoot() {
  const boot = qs('#boot');
  if (reduceMotion) {
    boot.remove();
    return;
  }
  window.setTimeout(() => boot.classList.add('is-done'), 1150);
  window.setTimeout(() => boot.remove(), 2150);
}

function initMenu() {
  const menu = qs('#mobile-menu');
  const toggle = qs('#menu-toggle');

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
  };
  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  };

  toggle.addEventListener('click', () => menu.classList.contains('is-open') ? close() : open());
  qsa('[data-menu-close]').forEach((node) => node.addEventListener('click', close));
}

function initTopbar() {
  const topbar = qs('#topbar');
  const progress = qs('#scroll-progress');
  let previousY = window.scrollY;

  const update = () => {
    const currentY = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? currentY / max : 0;
    progress.style.transform = `scaleX(${ratio})`;

    if (currentY > 160 && currentY > previousY + 5) topbar.classList.add('is-hidden');
    if (currentY < previousY - 5 || currentY < 80) topbar.classList.remove('is-hidden');
    previousY = currentY;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initCursor() {
  if (!isFinePointer || reduceMotion) return;
  const ring = qs('#cursor');
  const dot = qs('#cursor-dot');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    ring.style.opacity = '1';
    dot.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    ring.style.opacity = '0';
    dot.style.opacity = '0';
  });

  const animate = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animate);
  };
  animate();

  document.addEventListener('mouseover', (event) => {
    if (event.target.closest('a, button, input, textarea')) ring.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', (event) => {
    if (event.target.closest('a, button, input, textarea')) ring.classList.remove('is-hovering');
  });
}

function initMagnetic(root = document) {
  if (!isFinePointer || reduceMotion) return;
  qsa('.magnetic', root).forEach((element) => {
    if (element.dataset.magneticReady) return;
    element.dataset.magneticReady = 'true';
    element.addEventListener('mousemove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
    });
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
}

function initHeroField() {
  const canvas = qs('#hero-field');
  const context = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let points = [];
  let pointer = { x: -1000, y: -1000 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 700 ? 34 : 64;
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.5 + .5
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const linkDistance = width < 700 ? 110 : 145;

    points.forEach((point, index) => {
      if (!reduceMotion) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;

        const pd = Math.hypot(pointer.x - point.x, pointer.y - point.y);
        if (pd < 120 && pd > 1) {
          point.x -= ((pointer.x - point.x) / pd) * .18;
          point.y -= ((pointer.y - point.y) / pd) * .18;
        }
      }

      for (let j = index + 1; j < points.length; j += 1) {
        const other = points[j];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < linkDistance) {
          context.strokeStyle = `rgba(121,160,255,${(1 - distance / linkDistance) * .24})`;
          context.lineWidth = .65;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      context.fillStyle = 'rgba(255,255,255,.72)';
      context.beginPath();
      context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      context.fill();
    });

    if (!reduceMotion) requestAnimationFrame(draw);
  };

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  });
  canvas.addEventListener('pointerleave', () => { pointer = { x: -1000, y: -1000 }; });
  window.addEventListener('resize', resize);
  resize();
  draw();
}

function initProjectTilt() {
  if (!isFinePointer || reduceMotion) return;
  qsa('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - .5) * -3;
      const ry = ((event.clientX - rect.left) / rect.width - .5) * 3;
      card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

function showToast(message) {
  const toast = qs('#toast');
  toast.textContent = message;
  toast.classList.add('is-showing');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-showing'), 2200);
}

function initContactForm() {
  const form = qs('#contact-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Shaurya,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
    showToast('Opening your email application...');
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  });

  qs('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast('Email copied to clipboard');
    } catch {
      showToast(profile.email);
    }
  });
}

function initSmoothAnchors() {
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = qs(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

function init() {
  setProfileContent();
  renderProofPoints();
  renderProjects();
  renderCapabilities();
  renderAchievements();
  renderStack();
  renderTimeline();

  initBoot();
  initMenu();
  initTopbar();
  initCursor();
  initHeroField();
  initFilters();
  initModal();
  initContactForm();
  initSmoothAnchors();
  initMagnetic();
  initProjectTilt();
  initReveal();
}

init();
