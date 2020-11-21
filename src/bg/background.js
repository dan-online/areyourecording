// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//   sample_setting: "This is how you use Store.js to remember values",
// });

//example of using a message handler from the inject scripts
var browser = browser || chrome;

// async function getState(cb) {
//   browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
//     const state = browser.tabs.sendMessage(
//       tabs[0].id,
//       {
//         type: "getState",
//       },
//       (...state) => {
//         console.log(state);
//         cb(state);
//       }
//     );
//   });
// }

chrome.extension.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse();
});
