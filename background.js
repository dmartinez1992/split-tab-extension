// background.js — Tab Split View Extension

async function splitTabs() {
  try {
    // Get the current window
    const currentWindow = await browser.windows.getCurrent();

    // Get all tabs in the current window
    const tabs = await browser.tabs.query({ windowId: currentWindow.id });

    if (tabs.length < 2) {
      browser.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Tab Split View",
        message: "You need at least 2 tabs open to use split view."
      });
      return;
    }

    // Identify the active tab and all other tabs
    const activeTab = tabs.find(t => t.active);
    const otherTabs = tabs.filter(t => t.id !== activeTab.id);

    const screenWidth = window.screen.width || 2560;
    const screenHeight = window.screen.height || 1440;
    const halfWidth = Math.floor(screenWidth / 2);

    // Create the LEFT window using the first "other" tab
    const leftWindow = await browser.windows.create({
      tabId: otherTabs[0].id,
      left: 0,
      top: 0,
      width: halfWidth,
      height: screenHeight,
      type: "normal"
    });

    // Move any remaining "other" tabs into the left window
    for (let i = 1; i < otherTabs.length; i++) {
      await browser.tabs.move(otherTabs[i].id, {
        windowId: leftWindow.id,
        index: -1  // append to end
      });
    }

    // Create the RIGHT window with the active tab
    const rightWindow = await browser.windows.create({
      tabId: activeTab.id,
      left: halfWidth,
      top: 0,
      width: halfWidth,
      height: screenHeight,
      type: "normal"
    });

    // Focus the right window
    await browser.windows.update(rightWindow.id, { focused: true });

  } catch (err) {
    console.error("Tab Split View error:", err);
  }
}

// Trigger via toolbar button click
browser.browserAction.onClicked.addListener(splitTabs);

// Trigger via Option+X keyboard shortcut
browser.commands.onCommand.addListener((command) => {
  if (command === "split-tabs") {
    splitTabs();
  }
});
