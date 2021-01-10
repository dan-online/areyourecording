function findText(text) {
  var aTags = document.getElementsByTagName("div");
  var searchText = text;
  var found = false;

  for (var i = 0; i < aTags.length; i++) {
    if (aTags[i].textContent == searchText) {
      found = aTags[i];
      break;
    }
  }
  return found;
}

function showAlert(text) {
  const elem = () => document.getElementById("are-you-recording");
  if (!elem()) {
    const newE = document.createElement("div");
    newE.id = "are-you-recording";
    document.body.appendChild(newE);
  }
  elem().innerHTML = '<span><i class="are-you-red"></i>' + text + "</span>";
  setTimeout(() => {
    elem().classList.add("slideIn");
  });
  elem().addEventListener("click", () => {
    elem().classList.remove("slideIn");
  });
}

let recording = false;

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(async function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      console.log("Hello. This message was sent from scripts/inject.js");

      let i = setInterval(() => {
        if (findText("Present now")) {
          clearInterval(i);
          document
            .querySelector(
              '[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"]'
            )
            .parentElement.parentElement.parentElement.click();
          setTimeout(() => {
            if (findText("Record meeting") && !recording) {
              showAlert("Make sure you record your meeting!");
              recording = true;
            }
          }, 10);
        }
      }, 1000);
    }
  }, 10);
});
