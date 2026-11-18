// AntiSpy Blur — content script.
// Translates settings into attributes on <html>; blur.css does the rest.
// Nothing here runs per message, per chat or on scroll.
(() => {
  'use strict';

  const root = document.documentElement;
  const SCOPES = {
    both: ['all', 'all'],
    left: ['all', 'off'],
    right: ['off', 'all'],
    names: ['names', 'names'],
    off: ['off', 'off']
  };

  let s = { ...WAB_DEFAULTS };
  let away = false;        // window not focused
  let idleLocked = false;  // mouse has not moved for s.idle seconds
  let lastMove = 0;
  let idleTimer = 0;
  let idleListening = false;

  const attr = (name, value) => {
    if (value == null) root.removeAttribute(name);
    else if (root.getAttribute(name) !== value) root.setAttribute(name, value);
  };

  function applyLock() {
    const lock = s.panic ? 'panic'
      : away && s.awayBlur ? 'away'
      : idleLocked ? 'idle'
      : null;
    attr('data-wab-lock', lock);
  }

  function apply() {
    const scope = s.panic ? 'both' : s.enabled ? s.scope : 'off';
    const [left, right] = SCOPES[scope] || SCOPES.both;
    attr('data-wab-left', left);
    attr('data-wab-right', right);
    attr('data-wab-lrev', s.leftReveal);
    attr('data-wab-rrev', s.rightReveal);
    attr('data-wab-media', s.mediaSeparate ? 'separate' : null);
    root.style.setProperty('--wab-blur', `${s.blur}px`);
    root.style.setProperty('--wab-delay', `${s.delay}ms`);

    const wantIdle = s.idle > 0 && scope !== 'off';
    if (wantIdle !== idleListening) {
      idleListening = wantIdle;
      if (wantIdle) {
        document.addEventListener('mousemove', onMove, { passive: true, capture: true });
      } else {
        document.removeEventListener('mousemove', onMove, { capture: true });
      }
    }
    clearTimeout(idleTimer);
    idleTimer = 0;
    idleLocked = false;
    if (wantIdle) {
      lastMove = performance.now();
      armIdle(s.idle * 1000);
    }
    applyLock();
  }

  // --- Idle re-blur: one timer per idle period, not one per mouse event. ---
  function armIdle(ms) {
    idleTimer = setTimeout(idleTick, ms);
  }

  function idleTick() {
    idleTimer = 0;
    const rest = s.idle * 1000 - (performance.now() - lastMove);
    if (rest > 50) {
      armIdle(rest);
    } else {
      idleLocked = true;
      applyLock();
    }
  }

  function onMove(e) {
    lastMove = e.timeStamp;
    if (idleLocked) {
      idleLocked = false;
      applyLock();
    }
    if (!idleTimer) armIdle(s.idle * 1000);
  }

  // --- Window focus ---
  window.addEventListener('blur', () => {
    away = true;
    attr('data-wab-key', null);
    applyLock();
  });
  window.addEventListener('focus', () => {
    away = false;
    applyLock();
  });

  // --- Hold-to-reveal key (Ctrl) ---
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Control' && !e.repeat) attr('data-wab-key', '');
  }, { passive: true, capture: true });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Control') attr('data-wab-key', null);
  }, { passive: true, capture: true });

  // --- Markup self-check -------------------------------------------------
  // If WhatsApp renames its row markup, fall back to blurring whole panels
  // instead of silently showing everything. Runs shortly after clicks only.
  let checkTimer = 0;

  function selfCheck() {
    const fb = [];
    const side = document.getElementById('pane-side');
    if (side && side.childElementCount) {
      if (!side.querySelector('[role="listitem"], [role="row"]')) fb.push('left');
      else if (!side.querySelector('._ak8q')) fb.push('lnames');
    }
    const main = document.getElementById('main');
    if (main && !main.querySelector('[role="row"], [data-id], .message-in, .message-out')) {
      fb.push('right');
    }
    attr('data-wab-fb', fb.length ? fb.join(' ') : null);
  }

  function scheduleCheck(ms) {
    clearTimeout(checkTimer);
    checkTimer = setTimeout(selfCheck, ms);
  }

  document.addEventListener('click', () => scheduleCheck(1500), { passive: true, capture: true });
  window.addEventListener('load', () => scheduleCheck(5000), { once: true });

  // --- Settings ---
  chrome.storage.local.get(WAB_DEFAULTS, (stored) => {
    s = { ...WAB_DEFAULTS, ...stored };
    apply();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    for (const key in changes) {
      if (key in WAB_DEFAULTS) {
        s[key] = changes[key].newValue ?? WAB_DEFAULTS[key];
      }
    }
    apply();
  });
})();
