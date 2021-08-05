// background.js
chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "open-tab-in-current-group":{
      const currTab = await getCurrentTab();
      if (currTab?.groupId !== -1) {
        const newTab = await chrome.tabs.create({});
        chrome.tabs.group({
          groupId: currTab.groupId,
          tabIds: [newTab.id]
        });
      }
      break;
    }
    case "create-group-in-current-tab": {
      const currTab = await getCurrentTab();
      if (currTab) {
        chrome.tabs.group({ tabIds: [currTab.id] });
      }
      break;
    }
    case "remove-current-tab-from-group": {
      const currTab = await getCurrentTab();
      if (currTab?.groupId !== -1) {
        chrome.tabs.ungroup(currTab.id);
      }
      break;
    }
    default:
      break;
  }
});

async function getCurrentTab() {
  return (await chrome.tabs.query({ active: true }))?.[0];
}

