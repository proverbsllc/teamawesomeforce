//popup.js
// open new google scholar search
//const document = document.getElementById("refresh_list")

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
				
				chrome.storage.local.get('topRec', function (arr) {
					var recArr = arr.topRec;
					var recList = "";
					var tagOnce = false;
					for (var i = 0; recrr !== undefined && i < recArr.length; i++) {
						var recItem = document.getElementById('id' + i);
						if (recItem.checked) {
							if (tagOnce) {
								recList = recList + "+";
							}
							recList = recList + recItem.nextElementSibling.innerHTML;
							//alert(keywordItem.nextElementSibling.innerHTML);
							//alert(keywordList);
							tagOnce = true;
						}
					}
				var newURL = "https://scholar.google.com/scholar?q=" + keywordList.split(" ").join("+") + "+" + authorList.split(" ").join("+");
				//alert(newURL);
				chrome.tabs.create({ url: newURL });
			});
		});
		});
	});
}, false);

// click tabs of advanced view
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

// swap between basic and advanced views
document.addEventListener('DOMContentLoaded', function () {
	var advancedCheck = document.getElementById('advanced-int');
	advancedCheck.addEventListener('click', function () {
		if ($("#advanced-int").prop("checked") == true) {
			// display the advanced section and hide the basic
			$("#basic").removeClass("active");
			$("#advanced").addClass("active");
		}
		else {
			$("#advanced").removeClass("active");
			$("#basic").addClass("active");
		}
		chrome.storage.local.set({ 'advCheckBox': $("#advanced-int").prop("checked") }, function () {
			var error = chrome.runtime.lastError;
			if (error) {
				console.error(error);
			}
		});
	});
}, false);

function finishedRefresh(val) {
	$("#keywordList").empty();
	$("#authorList").empty();
	$("#affiliationList").empty();
	$("#articleList").empty();
	var authorArr = Array();
	var keywordArr = Array();
	var affiliationArr = Array();
	var articleArr = Array();
	var fullAuthor = "";

	if (val !== undefined && val.length > 2) {
		authorArr = val[0];
		keywordArr = val[1];
		affiliationArr = val[2];
		articleArr = val[3];
	}

	for (var i = 0; keywordArr !== undefined && i < keywordArr.length; i = i + 2) {
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

	for (var i = 0; authorArr !== undefined && i < authorArr.length; i = i + 2) {
		var entry = document.createElement('div');
		entry.classList.add("row");
		var col1 = document.createElement('div');
		col1.classList.add("twocolumn");
		col1.innerHTML = '<input id="author' + i + '" name="author' + i + '" type="checkbox">' +
			'<label for="author' + i + '">' + authorArr[i] + '</label>';
		if (i == 0) {
			fullAuthor = authorArr[i]
		}
		else {
			fullAuthor = fullAuthor + ", " + authorArr[i];
		}
		entry.appendChild(col1);
		var col2 = document.createElement('div');
		col2.classList.add("twocolumn");
		if (i + 1 < authorArr.length) {
			col2.innerHTML = '<input id="author' + (i + 1) + '" name="author' + (i + 1) + '" type="checkbox">' +
				'<label for="author' + (i + 1) + '">' + authorArr[(i + 1)] + '</label>';
			fullAuthor = fullAuthor + ", " + authorArr[(i + 1)];
		}
		entry.appendChild(col2);
		$("#authorList").append(entry);
	}

	for (var i = 0; affiliationArr !== undefined && i < affiliationArr.length; i = i + 2) {
		var entry = document.createElement('div');
		entry.classList.add("row");
		var col1 = document.createElement('div');
		col1.classList.add("twocolumn");
		col1.innerHTML = '<input id="affiliation' + i + '" name="affiliation' + i + '" type="checkbox">' +
			'<label for="affiliation' + i + '">' + affiliationArr[i] + '</label>';
		entry.appendChild(col1);
		var col2 = document.createElement('div');
		col2.classList.add("twocolumn");
		if (i + 1 < affiliationArr.length) {
			col2.innerHTML = '<input id="affiliation' + (i + 1) + '" name="affiliation' + (i + 1) + '" type="checkbox">' +
				'<label for="affiliation' + (i + 1) + '">' + affiliationArr[(i + 1)] + '</label>';
		}
		entry.appendChild(col2);
		$("#affiliationList").append(entry);
	}

	var entry = document.createElement('div');
	entry.style.padding = "8px";
	// Publication Type (ie CONFERENCE)
	var enChild = document.createElement('div');
	enChild.style.fontColor = "grey";
	enChild.innerHTML = articleArr[2]
	entry.appendChild(enChild);
	// Paper title
	enChild = document.createElement('div');
	enChild.style.fontWeight = "bold";
	enChild.innerHTML = articleArr[0];
	entry.appendChild(enChild);
	// Authors
	enChild = document.createElement('div');
	enChild.innerHTML = fullAuthor;
	entry.appendChild(enChild);
	// Publication
	enChild = document.createElement('div');
	enChild.style.fontStyle = "italic";
	enChild.innerHTML = articleArr[1];
	//alert(articleArr[4]);
	if (articleArr[4] > 0) {
		enChild.innerHTML = articleArr[1] + " [h5-index: " + articleArr[4] + "]";
	}
	else {
		enChild.innerHTML = articleArr[1];
	}
	entry.appendChild(enChild);
	$("#articleList").append(entry);

}

document.addEventListener('DOMContentLoaded', function () {
	var refreshBtn = document.getElementById('refresh_list');
	refreshBtn.addEventListener('click', function () {
		chrome.storage.local.get('checkpage', function (data) {
			chrome.storage.local.clear(function () {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});
			// Send a message to the active tab to collect the list of clickable items
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, { "message": "gather_list_of_items" }, finishedRefresh);
			});
			chrome.storage.local.set({ 'checkpage': true });
			chrome.storage.local.set({ 'advCheckBox': $("#advanced-int").prop("checked") }, function () {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});
		});

		//setFields();
	});
}, false);

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get('checkpage', function (data) {
		var isActive = data.checkpage;
		// !== undefined
		if (isActive === undefined || isActive === false) {
			// reset the list of saved clickable items
			isActive = true;
			chrome.storage.local.clear(function () {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});
			// Send a message to the active tab to collect the list of clickable items
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, { "message": "gather_list_of_items" }, finishedRefresh);
			});
			chrome.storage.local.set({ 'checkpage': isActive });
		}
	});
}, false);

function setFields() {
	$("#keywordList").empty();
	$("#authorList").empty();
	$("#affiliationList").empty();
	$("#articleList").empty();
	var fullAuthor = "";

	chrome.storage.local.get('keywordValues', function (arr) {
		var keywordArr = arr.keywordValues;
		for (var i = 0; keywordArr !== undefined && i < keywordArr.length; i = i + 2) {
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
			if (i == 0) {
				fullAuthor = authorArr[i]
			}
			else {
				fullAuthor = fullAuthor + ", " + authorArr[i];
			}
			entry.appendChild(col1);
			var col2 = document.createElement('div');
			col2.classList.add("twocolumn");
			if (i + 1 < authorArr.length) {
				col2.innerHTML = '<input id="author' + (i + 1) + '" name="author' + (i + 1) + '" type="checkbox">' +
					'<label for="author' + (i + 1) + '">' + authorArr[(i + 1)] + '</label>';
				fullAuthor = fullAuthor + ", " + authorArr[(i + 1)];
			}
			entry.appendChild(col2);
			$("#authorList").append(entry);
		}
	});

	chrome.storage.local.get('affiliationValues', function (arr) {
		var affiliationArr = arr.affiliationValues;
		for (var i = 0; affiliationArr !== undefined && i < affiliationArr.length; i = i + 2) {
			var entry = document.createElement('div');
			entry.classList.add("row");
			var col1 = document.createElement('div');
			col1.classList.add("twocolumn");
			col1.innerHTML = '<input id="affiliation' + i + '" name="affiliation' + i + '" type="checkbox">' +
				'<label for="affiliation' + i + '">' + affiliationArr[i] + '</label>';
			entry.appendChild(col1);
			var col2 = document.createElement('div');
			col2.classList.add("twocolumn");
			if (i + 1 < affiliationArr.length) {
				col2.innerHTML = '<input id="affiliation' + (i + 1) + '" name="affiliation' + (i + 1) + '" type="checkbox">' +
					'<label for="affiliation' + (i + 1) + '">' + affiliationArr[(i + 1)] + '</label>';
			}
			entry.appendChild(col2);
			$("#affiliationList").append(entry);
		}
	});

	chrome.storage.local.get('articleValues', function (arr) {
		var articleArr = arr.articleValues;
		var entry = document.createElement('div');
		entry.style.padding = "8px";
		var enChild;

		// Publication Type (ie CONFERENCE)
		enChild = document.createElement('div');
		enChild.style.fontColor = "grey";
		//enChild.innerHTML = articleArr[2];
		entry.appendChild(enChild);
		// Paper title
		enChild = document.createElement('div');
		enChild.style.fontWeight = "bold";
		//enChild.innerHTML = articleArr[0];
		entry.appendChild(enChild);
		// Authors
		enChild = document.createElement('div');
		enChild.innerHTML = fullAuthor;
		entry.appendChild(enChild);
		// Publication title
		enChild = document.createElement('div');
		enChild.style.fontStyle = "italic";
		//if (articleArr[4] > 0) {
			//enChild.innerHTML = articleArr[1] + " [h5-index: " + articleArr[4] + "]";
		//}
		//else {
		//	enChild.innerHTML = articleArr[1];
		//}

		entry.appendChild(enChild);
		$("#articleList").append(entry);
	});
}

window.onload = function () {
	setFields();

	chrome.storage.local.get('advCheckBox', function (val) {
		if (val.advCheckBox !== undefined) {
			var isChecked = val.advCheckBox;

			$("#advanced-int").prop("checked", isChecked);
			if (isChecked === true) {
				// display the advanced section and hide the basic
				$("#basic").removeClass("active");
				$("#advanced").addClass("active");
			}
			else {
				$("#advanced").removeClass("active");
				$("#basic").addClass("active");
			}
		}
	});
};


