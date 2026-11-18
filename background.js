// AntiSpy Blur — service worker. Only wakes for keyboard shortcuts.
chrome.commands.onCommand.addListener(async (command) => {
  const key = command === 'toggle-blur' ? 'enabled' : command === 'panic' ? 'panic' : null;
  if (!key) return;
  const fallback = key === 'enabled';
  const stored = await chrome.storage.local.get({ [key]: fallback });
  await chrome.storage.local.set({ [key]: !stored[key] });
});
