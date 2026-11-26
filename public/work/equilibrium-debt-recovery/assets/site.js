const menuButton = document.querySelector('.mobile-toggle');
const mainNav = document.getElementById('main-nav');
const serviceMenu = document.querySelector('.nav-services');
const mobileView = window.matchMedia('(max-width: 740px)');

function setMobileMenu(open) {
  mainNav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
  if (!open) serviceMenu.open = false;
}
menuButton.addEventListener('click', () => setMobileMenu(!mainNav.classList.contains('open')));
mobileView.addEventListener('change', () => setMobileMenu(false));
document.addEventListener('click', event => {
  if (!serviceMenu.contains(event.target)) serviceMenu.open = false;
  if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) setMobileMenu(false);
});
document.addEventListener('focusin', event => {
  if (!serviceMenu.contains(event.target)) serviceMenu.open = false;
  if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) setMobileMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (serviceMenu.open) {
    serviceMenu.open = false;
    serviceMenu.querySelector('summary').focus();
  } else if (mainNav.classList.contains('open')) {
    setMobileMenu(false);
    menuButton.focus();
  }
});

const guideSearch = document.getElementById('guide-search');
if (guideSearch) {
  const guides = [...document.querySelectorAll('[data-guide-category]')];
  const topics = [...document.querySelectorAll('[data-guide-topic]')];
  const buttons = [...document.querySelectorAll('[data-guide-filter]')];
  const count = document.getElementById('guide-count');
  const empty = document.getElementById('no-guides');
  const archive = document.querySelector('.archive');
  const archiveItems = [...archive.querySelectorAll('[data-archive-category]')];
  const archiveTotal = document.getElementById('archive-total');
  let category = 'all';
  const normalise = text => text.toLowerCase().replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const matches = (section, value, words) => (category === 'all' || section === category) && words.every(word => value.includes(word));
  function filterGuides() {
    const words = normalise(guideSearch.value).split(' ').filter(Boolean);
    let total = 0;
    for (const guide of guides) {
      guide.hidden = !matches(guide.dataset.guideCategory, normalise(guide.textContent + ' ' + guide.dataset.keywords), words);
      if (!guide.hidden) total++;
    }
    for (const topic of topics) topic.hidden = !topic.querySelector('[data-guide-category]:not([hidden])');
    let earlier = 0;
    for (const item of archiveItems) {
      item.hidden = !matches(item.dataset.archiveCategory, normalise(item.textContent), words);
      if (!item.hidden) earlier++;
    }
    count.textContent = total + (total === 1 ? ' guide' : ' guides');
    archiveTotal.textContent = String(earlier);
    archive.hidden = !earlier;
    if (words.length && earlier && !total) archive.open = true;
    empty.hidden = total > 0 || earlier > 0;
  }
  for (const button of buttons) button.addEventListener('click', () => {
    category = button.dataset.guideFilter;
    for (const other of buttons) other.setAttribute('aria-pressed', String(other === button));
    filterGuides();
  });
  guideSearch.addEventListener('input', filterGuides);
  document.getElementById('clear-search').addEventListener('click', () => {
    guideSearch.value = '';
    buttons[0].click();
    guideSearch.focus();
  });
  filterGuides();
}

function enableReviewDeck(section) {
  const deck = section.querySelector('.review-deck');
  const papers = [...deck.querySelectorAll('.review-paper')];
  const controls = section.querySelector('.review-controls');
  const playButton = controls.querySelector('[data-action="play"]');
  const counter = controls.querySelector('.review-position b');
  const announcement = section.querySelector('.review-announcement');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ring = playButton.querySelector('circle');
  let current = 0;
  let autoplay = !motion.matches;
  let inView = false;
  let reading = false;
  let touchStart = null;

  // The ring and the timer share one clock, including time spent paused or off screen.
  const clock = ring.animate([{ strokeDashoffset: '100' }, { strokeDashoffset: '0' }], {
    duration: 8500, fill: 'both',
  });
  clock.pause();
  function syncPlayback() {
    playButton.dataset.playing = String(autoplay);
    const label = autoplay ? 'Pause automatic reviews' : 'Play automatic reviews';
    playButton.setAttribute('aria-label', label);
    playButton.title = label;
    if (autoplay && inView && !reading && !document.hidden) clock.play();
    else clock.pause();
  }

  function arrange() {
    papers.forEach((paper, index) => {
      const depth = (index - current + papers.length) % papers.length;
      paper.dataset.layer = ['front', 'second', 'third'][depth] || 'away';
      paper.setAttribute('aria-hidden', String(depth !== 0));
    });
    counter.textContent = String(current + 1).padStart(2, '0');
  }

  function turn(direction, manual) {
    const previous = papers[current];
    current = (current + direction + papers.length) % papers.length;
    for (const paper of papers) delete paper.dataset.leaving;
    arrange();
    if (!motion.matches) previous.dataset.leaving = direction < 0 ? 'back' : 'forward';
    if (manual) {
      autoplay = false;
      const active = papers[current];
      announcement.textContent = 'Review ' + (current + 1) + ' of ' + papers.length + '. ' +
        active.querySelector('.reviewer-name').textContent + '. ' + active.querySelector('blockquote').textContent;
    }
    clock.currentTime = 0;
    syncPlayback();
  }
  clock.onfinish = () => {
    if (autoplay && inView && !reading && !document.hidden && clock.playState === 'finished') turn(1, false);
  };

  controls.querySelector('[data-action="previous"]').addEventListener('click', () => turn(-1, true));
  controls.querySelector('[data-action="next"]').addEventListener('click', () => turn(1, true));
  playButton.addEventListener('click', () => {
    autoplay = !autoplay;
    syncPlayback();
  });
  section.addEventListener('keydown', event => {
    if (!controls.contains(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      turn(event.key === 'ArrowLeft' ? -1 : 1, true);
    }
  });
  section.addEventListener('focusin', event => {
    if (event.target.matches(':focus-visible')) {
      autoplay = false;
      syncPlayback();
    }
  });
  deck.addEventListener('animationend', event => {
    if (event.target.classList.contains('review-paper')) delete event.target.dataset.leaving;
  });
  deck.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') {
      reading = true;
      syncPlayback();
    }
  });
  deck.addEventListener('pointerleave', () => {
    reading = false;
    syncPlayback();
  });
  deck.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    touchStart = { x: event.clientX, y: event.clientY };
    autoplay = false;
    syncPlayback();
  });
  deck.addEventListener('pointerup', event => {
    if (!touchStart || !event.isPrimary) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.3) turn(dx < 0 ? 1 : -1, true);
  });
  deck.addEventListener('pointercancel', () => { touchStart = null; });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      autoplay = false;
      for (const paper of papers) delete paper.dataset.leaving;
    }
    syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  new IntersectionObserver(([entry]) => {
    inView = entry.intersectionRatio >= .35;
    syncPlayback();
  }, { threshold: [0, .35] }).observe(deck);

  arrange();
  syncPlayback();
  section.dataset.ready = '';
  section.setAttribute('aria-roledescription', 'carousel');
  controls.hidden = false;
}

const reviewSection = document.querySelector('[data-reviews]');
if (reviewSection && 'animate' in Element.prototype && 'IntersectionObserver' in window) enableReviewDeck(reviewSection);
