// background.js — Tab Split View Extension

browser.browserAction.onClicked.addListener(async () => {
  try {
    // Get the current window info (to read screen width/height)
    const currentWindow = await browser.windows.getCurrent();

    // Get all tabs in the current window
    const tabs = await browser.tabs.query({ windowId: currentWindow.id });

    if (tabs.length < 2) {
      // Not enough tabs — notify the user
      browser.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Tab Split View",
        message: "You need at least 2 tabs open to use split view."
      });
      return;
    }

    // Find the active (current) tab
    const activeTab = tabs.find(t => t.active);

    // Find the most recently used other tab (the one just before the active tab)
    const otherTabs = tabs.filter(t => t.id !== activeTab.id);
    const otherTab = otherTabs[otherTabs.length - 1];

    // Use screen size from the current window position + dimensions
    // We'll use the full screen width by reading the window's screen coords
    const screenWidth = window.screen.width || 2560;
    const screenHeight = window.screen.height || 1440;

    const halfWidth = Math.floor(screenWidth / 2);
    const top = 0;
    const height = screenHeight;

    // Move the OTHER tab to a NEW window on the LEFT half
    const leftWindow = await browser.windows.create({
      tabId: otherTab.id,
      left: 0,
      top: top,
      width: halfWidth,
      height: height,
      type: "normal"
    });

    // Move the ACTIVE (current) tab to a NEW window on the RIGHT half
    const rightWindow = await browser.windows.create({
      tabId: activeTab.id,
      left: halfWidth,
      top: top,
      width: halfWidth,
      height: height,
      type: "normal"
    });

    // Focus the right window (current tab)
    await browser.windows.update(rightWindow.id, { focused: true });

  } catch (err) {
    console.error("Tab Split View error:", err);
  }
});
