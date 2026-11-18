// Shared by content.js and popup.js. Single source of truth for settings.
// eslint-disable-next-line no-unused-vars
const WAB_DEFAULTS = Object.freeze({
  enabled: true,
  panic: false,
  scope: 'both',          // both | left | right | names
  leftReveal: 'row',      // row | panel | key
  rightReveal: 'panel',   // panel | message | key
  blur: 8,                // px
  delay: 120,             // ms before a hover reveals
  idle: 10,               // seconds without mouse movement before re-blur; 0 = off
  awayBlur: true,         // re-blur while the window is not focused
  mediaSeparate: false    // keep photos/videos blurred until hovered individually
});
