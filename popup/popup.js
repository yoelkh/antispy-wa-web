// AntiSpy Blur — popup. Every control writes straight to storage; the page
// picks the change up live through chrome.storage.onChanged.
(() => {
  'use strict';

  const NUMERIC = new Set(['blur', 'delay', 'idle']);
  const $ = (sel) => document.querySelector(sel);
  const store = chrome.storage.local;
  let s = { ...WAB_DEFAULTS };

  function render() {
    for (const el of document.querySelectorAll('[data-key]')) {
      const value = s[el.dataset.key];
      if (el.type === 'checkbox') el.checked = !!value;
      else el.value = value;
    }
    for (const el of document.querySelectorAll('input[type="radio"]')) {
      el.checked = String(s[el.name]) === el.value;
    }
    for (const out of document.querySelectorAll('output')) {
      out.textContent = `${s[out.htmlFor[0]]} ${out.dataset.unit}`;
    }
    $('#panic').hidden = !s.panic;
    $('#controls').classList.toggle('off', !s.enabled && !s.panic);
    $('#status').textContent = s.panic ? 'Panic lock' : s.enabled ? 'Blur is on' : 'Blur is off';
  }

  function save(key, value) {
    s[key] = value;
    store.set({ [key]: value });
    render();
  }

  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.type === 'radio') {
      save(el.name, NUMERIC.has(el.name) ? Number(el.value) : el.value);
    } else if (el.dataset.key) {
      const key = el.dataset.key;
      save(key, el.type === 'checkbox' ? el.checked : Number(el.value));
    }
  });

  $('#unlock').addEventListener('click', () => save('panic', false));

  $('#shortcuts').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  });

  chrome.commands.getAll((commands) => {
    for (const c of commands) {
      const el = c.name === 'toggle-blur' ? $('#key-toggle') : c.name === 'panic' ? $('#key-panic') : null;
      if (el) el.textContent = c.shortcut || 'not set';
    }
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    for (const key in changes) {
      if (key in WAB_DEFAULTS) s[key] = changes[key].newValue ?? WAB_DEFAULTS[key];
    }
    render();
  });

  store.get(WAB_DEFAULTS, (stored) => {
    s = { ...WAB_DEFAULTS, ...stored };
    render();
  });
})();
