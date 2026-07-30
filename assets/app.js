(function () {
  'use strict';

  const data = window.PORTFOLIO_DATA;
  if (!data) {
    document.body.classList.add('is-ready');
    console.error('Portfolio data failed to load.');
    return;
  }

  const qs = (selector, root) => (root || document).querySelector(selector);
  const qsa = (selector, root) => Array.from((root || document).querySelectorAll(selector));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopQuery = window.matchMedia('(min-width: 901px)');

  let activeProjectIndex = 0;
  let showreelTimer = null;
  let showreelPlaying = false;
  let revealObserver = null;

  function setProfileLinks() {
    const p = data.profile;
    const links = {
      github: p.github,
      linkedin: p.linkedin,
      resume: p.resume,
      email: 'mailto:' + p.email,
      phone: 'tel:' + p.phoneHref
    };

    qsa('[data-profile-link]').forEach((element) => {
      const href = links[element.getAttribute('data-profile-link')];
      if (href) element.setAttribute('href', href);
    });

    const textMap = {
      '#profile-status': p.status,
      '#profile-intro': p.intro,
      '#profile-position': p.position,
      '#profile-availability': p.availability,
      '#contact-email': p.email,
      '#contact-phone': p.phoneDisplay
    };
    Object.keys(textMap).forEach((selector) => {
      const node = qs(selector);
      if (node) node.textContent = textMap[selector];
    });

    const heroProof = qs('#hero-proof');
    if (heroProof) {
      heroProof.innerHTML = data.proof.map((item) => (
        '<div><b>' + item.value + '</b><span>' + item.label + '</span></div>'
      )).join('');
    }
  }

  function topbarMarkup(title, status) {
    return '<div class="ui-topbar"><div class="ui-dots"><i></i><i></i><i></i></div><span>' + title + '</span><b class="ui-chip">' + status + '</b></div>';
  }

  function signalboardVisual(project) {
    const bars = [56, 82, 43, 91, 67, 74, 52, 88].map((height, index) => (
      '<i style="--bar:' + height + '%;--delay:' + (-index * 0.18) + 's"></i>'
    )).join('');
    return '<div class="product-visual signalboard-ui" style="--accent:' + project.accent + ';--accent-rgb:' + project.accentRgb + '">' +
      '<div class="ui-window">' + topbarMarkup('SIGNALBOARD / REVIEW WORKSPACE', 'LIVE DATA') +
      '<div class="ui-body">' +
        '<aside class="signal-sidebar"><div class="signal-logo">S</div><div class="signal-nav"><i></i><i></i><i></i><i></i><i></i><i></i></div></aside>' +
        '<section class="signal-main"><div class="signal-heading"><b>Signal overview</b><span>250 FEEDBACK RECORDS</span></div><div class="signal-chart">' + bars + '</div>' +
          '<div class="signal-themes"><article class="signal-theme"><b>Onboarding friction</b><p>Evidence-linked theme with verified source coverage.</p></article><article class="signal-theme"><b>Search relevance</b><p>Recurring pattern across support and survey channels.</p></article><article class="signal-theme"><b>Billing clarity</b><p>Deterministic count and source distribution.</p></article><article class="signal-theme"><b>Export workflow</b><p>Human-reviewed problem statement.</p></article></div></section>' +
        '<aside class="signal-review"><span class="review-title">HUMAN REVIEW</span><div class="review-card"><b>Theme 07 / Ready</b><p>Every cited feedback ID has been checked against persisted cluster membership.</p><div class="review-actions"><i></i><i></i></div></div><div class="review-feed"><i></i><i></i><i></i></div></aside>' +
      '</div></div></div>';
  }

  function jobsignalVisual(project) {
    const jobs = [
      ['N', 'AI Platform Engineer', 'Funding signal / 2d', '91'],
      ['A', 'Backend Systems Engineer', 'Leadership hire / 4d', '86'],
      ['F', 'Applied AI Engineer', 'Expansion signal / 6d', '82'],
      ['S', 'Software Engineer', 'Product launch / 8d', '78']
    ];
    return '<div class="product-visual jobsignal-ui" style="--accent:' + project.accent + ';--accent-rgb:' + project.accentRgb + '">' +
      '<div class="ui-window">' + topbarMarkup('CMD // SIGNAL', 'PROFILE ACTIVE') +
      '<div class="ui-body"><section class="jobsignal-feed"><div class="job-heading"><b>Live opportunity radar</b><span>12 SIGNALS FOUND</span></div>' +
        jobs.map((job) => '<article class="job-card"><i class="job-card__logo"></i><div><b>' + job[1] + '</b><small>' + job[2] + '</small></div><span class="job-score">' + job[3] + '%</span></article>').join('') +
      '</section><aside class="jobsignal-lab"><div class="fit-ring"><b>83</b><small>FIT SCORE</small></div><div class="fit-block"><span>MATCHED EVIDENCE</span><div class="fit-lines"><i></i><i></i><i></i></div></div><div class="fit-block"><span>REAL GAPS</span><div class="fit-lines"><i></i><i></i></div></div><div class="fit-block"><span>PROOF-OF-WORK HOOK</span><div class="fit-lines"><i></i><i></i><i></i></div></div></aside></div></div></div>';
  }

  function documentVisual(project) {
    const nodes = ['INGEST', 'VALIDATE', 'EXTRACT', 'CHUNK', 'INDEX', 'RETRIEVE', 'EVALUATE'];
    return '<div class="product-visual document-ui" style="--accent:' + project.accent + ';--accent-rgb:' + project.accentRgb + '">' +
      '<div class="ui-window">' + topbarMarkup('DOCUMENT INTELLIGENCE / PIPELINE', '64 TESTS') +
      '<div class="ui-body"><div class="pipeline-head"><b>Ingestion → evaluation</b><span>11 FORMATS / 13 STAGES</span></div><div class="pipeline-track"><i class="pipeline-packet"></i>' +
      nodes.map((node) => '<div class="pipeline-node">' + node + '</div>').join('') +
      '</div><div class="pipeline-bottom"><div class="pipeline-panel"><span>RETRIEVAL QUALITY</span><div class="pipeline-bars"><i style="--w:92%"></i><i style="--w:86%"></i><i style="--w:78%"></i><i style="--w:95%"></i></div></div><div class="pipeline-panel"><span>ACTIVE DOCUMENT ROUTES</span><div class="pipeline-docs"><i></i><i></i><i></i><i></i><i></i></div></div></div></div></div></div>';
  }

  function meteoriteVisual(project) {
    return '<div class="product-visual meteorite-ui" style="--accent:' + project.accent + ';--accent-rgb:' + project.accentRgb + '">' +
      '<div class="ui-window">' + topbarMarkup('METEORITE TEXTURE ANALYSER', 'MODEL READY') +
      '<div class="ui-body"><section class="meteor-stage"><div class="meteor-grid"></div><div class="meteor-rock"></div><div class="meteor-corners"><span></span><span></span><span></span><span></span></div></section><aside class="meteor-panel"><div class="meteor-result"><span>CLASSIFICATION</span><b>SILICATE-RICH</b></div><div class="comp-bars"><div class="comp-row"><span>SILICATE</span><b>72.4%</b><i style="--w:72.4%"></i></div><div class="comp-row"><span>METAL</span><b>27.6%</b><i style="--w:27.6%"></i></div></div><div class="meteor-info"><i></i><i></i><i></i></div></aside></div></div></div>';
  }

  function thirdEyeVisual(project) {
    const tenders = [
      ['Infrastructure monitoring', 'Deadline / 09 Aug'],
      ['Geospatial analytics', 'Deadline / 13 Aug'],
      ['Data modernisation', 'Deadline / 18 Aug']
    ];
    return '<div class="product-visual third-eye-ui" style="--accent:' + project.accent + ';--accent-rgb:' + project.accentRgb + '">' +
      '<div class="ui-window">' + topbarMarkup('THIRD EYE / PROCUREMENT FLOW', 'DOMAIN VALIDATED') +
      '<div class="ui-body"><aside class="tender-list"><span>DISCOVERED TENDERS</span>' + tenders.map((t, i) => '<div class="tender-card' + (i === 1 ? ' is-active' : '') + '"><b>' + t[0] + '</b><small>' + t[1] + '</small></div>').join('') + '</aside>' +
      '<section class="workflow-map"><i class="workflow-line"></i><i class="workflow-pulse"></i><div class="workflow-nodes"><div class="workflow-node">SEARCH</div><div class="workflow-node">PARSE</div><div class="workflow-node">VALIDATE</div><div class="workflow-node">DRAFT</div></div></section>' +
      '<aside class="proposal-panel"><span>TAILORED PROPOSAL</span><div class="proposal-paper"><b>Technical approach</b><div class="proposal-lines"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="proposal-status">READY FOR REVIEW</div></div></aside></div></div></div>';
  }

  function grainVisual(project) {
    const palette = ['#82a7ff', '#7cf3d4', '#d7ff63', '#ff79cf', '#b48cff', '#394462'];
    const cells = Array.from({ length: 80 }, function (_, index) {
      const color = palette[(index * 7 + Math.floor(index / 10) * 3) % palette.length];
      const opacity = (0.42 + ((index * 17) % 48) / 100).toFixed(2);
      const rotate = ((index * 29) % 90 - 45) + 'deg';
      const delay = (-((index * 0.11) % 4)).toFixed(2) + 's';
      return '<i style="--cell:' + color + ';--opacity:' + opacity + ';--rotate:' + rotate + ';--delay:' + delay + '"></i>';
    }).join('');
    const classes = [
      ['#82a7ff', 'Quartz', '31.2%'],
      ['#7cf3d4', 'Feldspar', '26.7%'],
      ['#d7ff63', 'Matrix', '18.1%'],
      ['#ff79cf', 'Accessory', '12.8%'],
      ['#b48cff', 'Boundary', '11.2%']
    ];
    return '<div class="product-visual grain-ui" style="--accent:' + project.accent + ';--accent-rgb:' + project.accentRgb + '">' +
      '<div class="ui-window">' + topbarMarkup('SIX-CHANNEL SEGMENTATION', 'INFERENCE COMPLETE') +
      '<div class="ui-body"><section class="micrograph"><div class="grain-cells">' + cells + '</div><i class="micrograph-scan"></i><span class="micrograph-scale">250 μm</span></section><aside class="grain-panel"><span>UNSEEN SAMPLE / RESULTS</span><div class="grain-metric"><b>0.94+</b><small>MEAN IOU</small></div><div class="grain-metric"><b>18,996</b><small>DETECTED GRAINS</small></div><div class="class-list">' + classes.map((c) => '<div class="class-row"><i style="--c:' + c[0] + '"></i><span>' + c[1] + '</span><b>' + c[2] + '</b></div>').join('') + '</div></aside></div></div></div>';
  }

  function visualMarkup(project) {
    if (project.id === 'signalboard') return signalboardVisual(project);
    if (project.id === 'jobsignal') return jobsignalVisual(project);
    if (project.id === 'document-intelligence') return documentVisual(project);
    if (project.id === 'meteorite') return meteoriteVisual(project);
    if (project.id === 'third-eye') return thirdEyeVisual(project);
    return grainVisual(project);
  }

  function copyMarkup(project, index) {
    const linkMarkup = [
      project.repo ? '<a href="' + project.repo + '" target="_blank" rel="noreferrer">Repository ↗</a>' : '',
      project.live ? '<a href="' + project.live + '" target="_blank" rel="noreferrer">Live product ↗</a>' : ''
    ].join('');

    return '<div class="episode-copy__inner' + (index === 0 ? ' is-active' : '') + '" data-copy-index="' + index + '">' +
      '<p class="episode-copy__code">EPISODE ' + project.episode + ' / ' + project.category + '</p>' +
      '<h3>' + project.title + '</h3>' +
      '<p class="episode-copy__subtitle">' + project.subtitle + '</p>' +
      '<p class="episode-copy__summary">' + project.summary + '</p>' +
      '<div class="episode-copy__metrics">' + project.metrics.map((metric) => '<div><b>' + metric.value + '</b><span>' + metric.label + '</span></div>').join('') + '</div>' +
      '<div class="episode-copy__actions"><button type="button" data-open-case="' + project.id + '">Open case study <span>↗</span></button>' + linkMarkup + '</div>' +
    '</div>';
  }

  function renderProjects() {
    const indexNode = qs('#episode-index');
    const stageNode = qs('#episode-stage');
    const copyNode = qs('#episode-copy');
    const stepsNode = qs('#episode-steps');
    if (!indexNode || !stageNode || !copyNode || !stepsNode) return;

    indexNode.innerHTML = data.projects.map((project, index) => (
      '<button type="button" data-project-index="' + index + '" class="' + (index === 0 ? 'is-active' : '') + '"><span>' + project.episode + '</span><b>' + project.title + '</b></button>'
    )).join('');

    stageNode.innerHTML = data.projects.map((project, index) => (
      '<article class="episode-stage__frame' + (index === 0 ? ' is-active' : '') + '" data-frame-index="' + index + '">' +
        '<div class="episode-stage__label"><i></i><span>' + project.category + '</span></div>' +
        visualMarkup(project) +
        '<span class="episode-stage__poster">' + project.poster + ' / ' + project.year + '</span>' +
      '</article>'
    )).join('');

    copyNode.innerHTML = data.projects.map(copyMarkup).join('');
    stepsNode.innerHTML = data.projects.map((project, index) => '<div class="episode-step" data-step-index="' + index + '" aria-hidden="true"></div>').join('');
  }

  function renderSupportSections() {
    const recognition = qs('#recognition');
    if (recognition) {
      recognition.innerHTML = data.recognition.map((item, index) => (
        '<article class="evidence-card reveal" style="--fill:' + (62 + index * 13) + '%"><small>0' + (index + 1) + ' / VERIFIED RESULT</small><b>' + item.value + '</b><h3>' + item.title + '</h3><p>' + item.body + '</p></article>'
      )).join('');
    }

    const principles = qs('#principles');
    if (principles) {
      principles.innerHTML = data.principles.map((item) => (
        '<article class="principle reveal"><small>' + item.number + '</small><h3>' + item.title + '</h3><p>' + item.body + '</p></article>'
      )).join('');
    }

    const stackGrid = qs('#stack-grid');
    if (stackGrid) {
      stackGrid.innerHTML = data.stack.map((group, index) => (
        '<article class="stack-group reveal" data-index="0' + (index + 1) + '"><small>MODULE 0' + (index + 1) + '</small><h3>' + group.label + '</h3><ul>' + group.items.map((item) => '<li>' + item + '</li>').join('') + '</ul></article>'
      )).join('');
    }

    const timeline = qs('#timeline');
    if (timeline) {
      timeline.innerHTML = data.timeline.map((entry, index) => (
        '<article class="timeline-entry reveal" data-index="0' + (index + 1) + '"><span>' + entry.years + '</span><h3>' + entry.title + '</h3><h4>' + entry.place + '</h4><p>' + entry.note + '</p></article>'
      )).join('');
    }
  }

  function setActiveProject(index, options) {
    const safeIndex = clamp(index, 0, data.projects.length - 1);
    const project = data.projects[safeIndex];
    activeProjectIndex = safeIndex;

    document.documentElement.style.setProperty('--accent', project.accent);
    document.documentElement.style.setProperty('--accent-rgb', project.accentRgb);

    qsa('[data-project-index]').forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === safeIndex);
      button.setAttribute('aria-current', buttonIndex === safeIndex ? 'true' : 'false');
    });
    qsa('[data-frame-index]').forEach((frame, frameIndex) => frame.classList.toggle('is-active', frameIndex === safeIndex));
    qsa('[data-copy-index]').forEach((copy, copyIndex) => copy.classList.toggle('is-active', copyIndex === safeIndex));

    const label = qs('#episode-progress-label');
    const rail = qs('#showreel-rail-fill');
    if (label) label.textContent = 'EPISODE ' + project.episode + ' / 06';
    if (rail) rail.style.transform = 'scaleX(' + ((safeIndex + 1) / data.projects.length) + ')';

    if (options && options.scrollIndexIntoView) {
      const button = qs('[data-project-index="' + safeIndex + '"]');
      if (button && button.scrollIntoView) button.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function setupProjectNavigation() {
    qsa('[data-project-index]').forEach((button) => {
      button.addEventListener('click', function () {
        stopShowreel();
        const index = Number(button.getAttribute('data-project-index')) || 0;
        if (desktopQuery.matches) {
          const step = qs('[data-step-index="' + index + '"]');
          if (step) step.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
        } else {
          setActiveProject(index, { scrollIndexIntoView: true });
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const stepObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || !desktopQuery.matches) return;
          const index = Number(entry.target.getAttribute('data-step-index')) || 0;
          setActiveProject(index);
        });
      }, { threshold: 0, rootMargin: '-46% 0px -46% 0px' });
      qsa('[data-step-index]').forEach((step) => stepObserver.observe(step));
    }
  }

  function updateShowreelButton() {
    const buttons = [qs('#showreel-toggle'), qs('#hero-play')].filter(Boolean);
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', showreelPlaying ? 'true' : 'false');
      const label = button.querySelector('span:first-of-type');
      if (button.id === 'showreel-toggle') {
        const text = button.querySelector('span');
        if (text) text.textContent = showreelPlaying ? 'Stop showreel' : 'Play showreel';
      } else {
        button.innerHTML = showreelPlaying ? 'Stop showreel <span>■</span>' : 'Watch 60-second showreel <span>▶</span>';
      }
    });
  }

  function stopShowreel() {
    showreelPlaying = false;
    if (showreelTimer) window.clearTimeout(showreelTimer);
    showreelTimer = null;
    updateShowreelButton();
  }

  function showNextProject() {
    if (!showreelPlaying) return;
    const nextIndex = activeProjectIndex + 1;
    if (nextIndex >= data.projects.length) {
      stopShowreel();
      const evidence = qs('#evidence');
      if (evidence) evidence.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }

    if (desktopQuery.matches) {
      const step = qs('[data-step-index="' + nextIndex + '"]');
      if (step) step.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    } else {
      setActiveProject(nextIndex, { scrollIndexIntoView: true });
    }
    showreelTimer = window.setTimeout(showNextProject, 5200);
  }

  function startShowreel() {
    stopShowreel();
    showreelPlaying = true;
    updateShowreelButton();
    const showreel = qs('#showreel');
    if (showreel) showreel.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    setActiveProject(0, { scrollIndexIntoView: true });
    if (desktopQuery.matches) {
      const firstStep = qs('[data-step-index="0"]');
      if (firstStep) window.setTimeout(function () { firstStep.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' }); }, 700);
    }
    showreelTimer = window.setTimeout(showNextProject, 5600);
  }

  function setupShowreelControls() {
    [qs('#showreel-toggle'), qs('#hero-play')].filter(Boolean).forEach(function (button) {
      button.addEventListener('click', function () {
        if (showreelPlaying) stopShowreel();
        else startShowreel();
      });
    });

    ['wheel', 'touchstart'].forEach(function (eventName) {
      window.addEventListener(eventName, function () {
        if (showreelPlaying) stopShowreel();
      }, { passive: true });
    });
    window.addEventListener('keydown', function (event) {
      if (showreelPlaying && ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(event.key) >= 0) stopShowreel();
    });
  }

  function setupDialog() {
    const dialog = qs('#case-dialog');
    const closeButton = qs('#case-dialog-close');
    if (!dialog) return;

    const projectById = {};
    data.projects.forEach((project) => { projectById[project.id] = project; });

    function closeDialog() {
      if (typeof dialog.close === 'function' && dialog.open) dialog.close();
      else dialog.removeAttribute('open');
      document.body.classList.remove('dialog-open');
    }

    function openDialog(id) {
      const project = projectById[id];
      if (!project) return;
      stopShowreel();
      dialog.style.setProperty('--accent', project.accent);
      dialog.style.setProperty('--accent-rgb', project.accentRgb);
      const code = qs('#case-dialog-code');
      const title = qs('#case-dialog-title');
      const summary = qs('#case-dialog-summary');
      const metrics = qs('#case-dialog-metrics');
      const details = qs('#case-dialog-details');
      const tags = qs('#case-dialog-tags');
      const actions = qs('#case-dialog-actions');
      const visual = qs('#case-dialog-visual');
      if (code) code.textContent = 'EPISODE ' + project.episode + ' / ' + project.category + ' / ' + project.year;
      if (title) title.textContent = project.title;
      if (summary) summary.textContent = project.summary;
      if (metrics) metrics.innerHTML = project.metrics.map((m) => '<div><b>' + m.value + '</b><span>' + m.label + '</span></div>').join('');
      if (details) details.innerHTML = project.details.map((detail) => '<li>' + detail + '</li>').join('');
      if (tags) tags.innerHTML = project.tags.map((tag) => '<span>' + tag + '</span>').join('');
      if (visual) visual.innerHTML = visualMarkup(project);
      if (actions) {
        actions.innerHTML = [
          project.repo ? '<a href="' + project.repo + '" target="_blank" rel="noreferrer">Open repository ↗</a>' : '',
          project.live ? '<a href="' + project.live + '" target="_blank" rel="noreferrer">Open live product ↗</a>' : ''
        ].join('');
      }
      document.body.classList.add('dialog-open');
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }

    document.addEventListener('click', function (event) {
      const trigger = event.target.closest('[data-open-case]');
      if (trigger) openDialog(trigger.getAttribute('data-open-case'));
    });
    if (closeButton) closeButton.addEventListener('click', closeDialog);
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener('close', function () { document.body.classList.remove('dialog-open'); });
  }

  function setupMenu() {
    const menu = qs('#mobile-menu');
    const toggle = qs('#menu-toggle');
    if (!menu || !toggle) return;

    function closeMenu() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
    });
    qsa('[data-menu-close]').forEach((node) => node.addEventListener('click', closeMenu));
  }

  function setupReveal() {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      qsa('.reveal').forEach((node) => node.classList.add('is-visible'));
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    qsa('.reveal').forEach((node) => revealObserver.observe(node));
  }

  function setupAnchors() {
    qsa('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        const selector = anchor.getAttribute('href');
        if (!selector || selector === '#') return;
        const target = qs(selector);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  function setupMotion() {
    const header = qs('#site-header');
    const progress = qs('#page-progress');
    const heroStage = qs('#hero-stage');
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let lastScroll = window.scrollY;

    if (heroStage && !reducedMotion) {
      window.addEventListener('pointermove', function (event) {
        targetX = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        targetY = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
      }, { passive: true });
    }

    function frame() {
      const currentScroll = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progress) progress.style.transform = 'scaleX(' + clamp(currentScroll / maxScroll, 0, 1) + ')';
      if (header) {
        header.classList.toggle('is-scrolled', currentScroll > 30);
        const goingDown = currentScroll > lastScroll && currentScroll > window.innerHeight * 0.75;
        header.style.transform = goingDown ? 'translateY(-140%)' : 'translateY(0)';
      }
      lastScroll = currentScroll;

      if (heroStage && !reducedMotion && window.innerWidth > 900) {
        pointerX += (targetX - pointerX) * 0.045;
        pointerY += (targetY - pointerY) * 0.045;
        const scrollShift = clamp(currentScroll / Math.max(window.innerHeight, 1), 0, 1) * 5;
        heroStage.style.transform = 'translate3d(' + (pointerX * 10) + 'px,' + (pointerY * 7 + scrollShift) + 'px,0) scale(1.015)';
      }
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function initialise() {
    setProfileLinks();
    renderProjects();
    renderSupportSections();
    setActiveProject(0);
    setupProjectNavigation();
    setupShowreelControls();
    setupDialog();
    setupMenu();
    setupReveal();
    setupAnchors();
    setupMotion();
    window.requestAnimationFrame(function () { document.body.classList.add('is-ready'); });
  }

  try {
    initialise();
  } catch (error) {
    document.body.classList.add('is-ready');
    qsa('.reveal').forEach((node) => node.classList.add('is-visible'));
    console.error('Portfolio initialisation error:', error);
  }
}());
