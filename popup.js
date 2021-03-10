//popup.js


// JavaScript source code
document.addEventListener('DOMContentLoaded', function () {
	var newSearchButton = document.getElementById('newSearch');
	newSearchButton.addEventListener('click', function () {

		chrome.storage.local.get('keywordValues', function (arr) {
			var keywordArr = arr.keywordValues;
			var keywordList = "";
			var tagOnce = false;
			for (var i = 0; keywordArr !== undefined && i < keywordArr.length; i++) {
				var keywordItem = document.getElementById('keyword' + i);
				if (keywordItem.checked) {
					if (tagOnce) {
						keywordList = keywordList + "+";
					}
					keywordList = keywordList + keywordItem.nextElementSibling.innerHTML;
					//alert(keywordItem.nextElementSibling.innerHTML);
					//alert(keywordList);
					tagOnce = true;
				}
			}
			chrome.storage.local.get('authorValues', function (arr) {
				var authorArr = arr.authorValues;
				var authorList = "";
				var tagOnce = false;
				for (var i = 0; authorArr !== undefined && i < authorArr.length; i++) {
					var authorItem = document.getElementById('author' + i);
					if (authorItem.checked) {
						if (tagOnce) {
							authorList = authorList + "+";
						}
						authorList = authorList + 'author%3A' + authorItem.nextElementSibling.innerHTML;
						//alert(authorItem.nextElementSibling.innerHTML);
						//alert(authorList);
						tagOnce = true;
					}
				}

				var newURL = "https://scholar.google.com/scholar?q=" + keywordList.split(" ").join("+") + "+" + authorList.split(" ").join("+");
				//alert(newURL);
				chrome.tabs.create({ url: newURL });
			});
		});

	});
}, false);

// JavaScript source code
document.addEventListener('DOMContentLoaded', function () {
	var keywordTabElement = document.getElementById('keywordTab');
	var authorTabElement = document.getElementById('authorTab');
	var affiliationTabElement = document.getElementById('affiliationTab');
	keywordTabElement.addEventListener('click', function () {


		keywordTabElement.classList.remove("inactivetab");
		authorTabElement.classList.add("inactivetab");
		affiliationTabElement.classList.add("inactivetab");

		$("#keywordList").addClass("active");
		$("#authorList").removeClass("active");
		$("#affiliationList").removeClass("active");
	});
	authorTabElement.addEventListener('click', function () {

		//$('#keywordTab').
		authorTabElement.classList.remove("inactivetab");
		keywordTabElement.classList.add("inactivetab");
		affiliationTabElement.classList.add("inactivetab");

		$("#keywordList").removeClass("active");
		$("#authorList").addClass("active");
		$("#affiliationList").removeClass("active");
	});
	affiliationTabElement.addEventListener('click', function () {

		//$('#keywordTab').
		affiliationTabElement.classList.remove("inactivetab");
		authorTabElement.classList.add("inactivetab");
		keywordTabElement.classList.add("inactivetab");

		$("#keywordList").removeClass("active");
		$("#authorList").removeClass("active");
		$("#affiliationList").addClass("active");
	});
}, false);

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get('checkpage', function (data) {
		var isActive = data.checkpage;
		if (isActive) {
			// reset the list of saved clickable items
			isActive = false;
			chrome.storage.local.clear(function () {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});
			// Send a message to the active tab to collect the list of clickable items
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, { "message": "gather_list_of_items" });
			});
		}
		else {
			isActive = true;

			// Send a message to the active tab to collect the list of clickable items
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, { "message": "gather_list_of_items" });
			});
		}
		chrome.storage.local.set({ 'checkpage': isActive });
	});
}, false);


window.onload = function () {
	chrome.storage.local.get('keywordValues', function (arr) {
		var keywordArr = arr.keywordValues;
		for (var i = 0; keywordArr !== undefined && i < keywordArr.length; i = i + 2)
		{
			var entry = document.createElement('div');
			entry.classList.add("row");
			var col1 = document.createElement('div');
			col1.classList.add("twocolumn");
			col1.innerHTML = '<input id="keyword' + i + '" name="keyword' + i + '" type="checkbox">' +
				'<label for="keyword' + i + '">' + keywordArr[i] + '</label>';
			entry.appendChild(col1);
			var col2 = document.createElement('div');
			col2.classList.add("twocolumn");
			if (i + 1 < keywordArr.length) {
				col2.innerHTML = '<input id="keyword' + (i + 1) + '" name="keyword' + (i + 1) + '" type="checkbox">' +
					'<label for="keyword' + (i + 1) + '">' + keywordArr[(i + 1)] + '</label>';
			}
			entry.appendChild(col2);
			$("#keywordList").append(entry);
		}
	});

	chrome.storage.local.get('authorValues', function (arr) {
		var authorArr = arr.authorValues;
		for (var i = 0; authorArr !== undefined && i < authorArr.length; i = i + 2) {
			var entry = document.createElement('div');
			entry.classList.add("row");
			var col1 = document.createElement('div');
			col1.classList.add("twocolumn");
			col1.innerHTML = '<input id="author' + i + '" name="author' + i + '" type="checkbox">' +
				'<label for="author' + i + '">' + authorArr[i] + '</label>';
			entry.appendChild(col1);
			var col2 = document.createElement('div');
			col2.classList.add("twocolumn");
			if (i + 1 < authorArr.length) {
				col2.innerHTML = '<input id="author' + (i + 1) + '" name="author' + (i + 1) + '" type="checkbox">' +
					'<label for="author' + (i + 1) + '">' + authorArr[(i + 1)] + '</label>';
			}
			entry.appendChild(col2);
			$("#authorList").append(entry);
		}
	});
};


