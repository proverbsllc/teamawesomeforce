// background.js

chrome.runtime.onStartup.addListener(function () {
	chrome.storage.local.set({ 'checkpage': false }, function () {});
});



