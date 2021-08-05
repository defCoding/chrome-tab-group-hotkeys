// popup.js
const settingsButton = document.getElementById("settings-button");
settingsButton.addEventListener("click", () => chrome.tabs.create({ url: "chrome://extensions/shortcuts" }));

// Display hotkeys.
chrome.commands.getAll((commands) => {
  const hotkeysTable = document.getElementById("hotkeys-table");
  commands.forEach((command) => {
    if (command.shortcut) {
      const row = hotkeysTable.insertRow();
      const hotkey = row.insertCell();
      const action = row.insertCell();

      hotkey.innerHTML = command.shortcut;
      action.innerHTML = command.description;
    }
  });
});
