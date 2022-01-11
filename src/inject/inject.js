function findText(text) {
  var aTags = document.querySelectorAll("*");
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
          document.querySelector('[aria-label="More options"]').click();
          let ii = setInterval(() => {
            console.log("Record", findText("Record meeting"));
            if (findText("Record meeting") && !recording) {
              clearInterval(ii);
              showAlert("Make sure you record your meeting!");
              recording = true;
            }
          }, 500);
        }
      }, 1000);
    }
  }, 10);
});
