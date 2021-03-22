// content.js

// gathers and saves all of the clickable content on a page
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) 
	{
		if( request.message === "gather_list_of_items" ) 
		{
			console.clear();
			var authorElements = Array();
			var keywordElements = Array();
			var affiliationElements = Array();
			var articleElements = Array();  // 0 = paper title, 1 = publication title, 2 = publication type, 3 = abstract

			console.log('----------AUTHOR LINK ELEMENTS----------');

			$("meta[property='article:author']").each(function (index) 
			{
				var authList = $(this).attr('content').split(',');
				for (var i = 0; i < authList.length; i++) {
					console.log(i + ": " + authList[i]);
					var inList = false;
					for (var j = 0; inList == false && j < authorElements.length; j++) {
						if (authList[i].trim() == authorElements[j]) {
							inList = true;
						}
					}
					if (!inList) {
						authorElements.push(authList[i].trim());
					}
				}
			});

			$("meta[name='citation_author']").each(function (index) {
				var authList = $(this).attr('content').split(',');
				for (var i = 0; i < authList.length; i++) {
					console.log(i + ": " + authList[i]);
					var inList = false;
					for (var j = 0; inList == false && j < authorElements.length; j++) {
						if (authList[i].trim() == authorElements[j]) {
							inList = true;
						}
					}
					if (!inList) {
						authorElements.push(authList[i].trim());
					}
				}
			});

			$("meta[name='dc.Creator']").each(function (index) {
				var authList = $(this).attr('content').split(',');
				for (var i = 0; i < authList.length; i++) {
					console.log(i + ": " + authList[i]);
					var inList = false;
					for (var j = 0; inList == false && j < authorElements.length; j++) {
						if (authList[i].trim().split("  ").join(" ") == authorElements[j]) {
							inList = true;
						}
					}
					if (!inList) {
						authorElements.push(authList[i].trim().split("  ").join(" "));
					}
				}
			});

			if (authorElements.length < 1) {
				$("a[class='author-name']").each(function (index) {
					console.log(index + ": " + $(this).attr('title'));
					var inList = false;
					for (var j = 0; inList == false && j < authorElements.length; j++) {
						if ($(this).attr('title').trim().split("  ").join(" ") == authorElements[j]) {
							inList = true;
						}
					}
					if (!inList) {
						authorElements.push($(this).attr('title').trim().split("  ").join(" "));
					}
				});
			}

			chrome.storage.local.set({'authorValues': authorElements}, function() 
			{
				var error = chrome.runtime.lastError;
				if (error) 
				{
					console.error(error);
				}
			});
			
			console.log('----------KEYWORD ELEMENTS----------');
			$("meta[name='keywords']").each(function (index) { 
				var keyList = $(this).attr('content').split(',');
				for (var i = 0; i < keyList.length; i++) {
					console.log(i + ": " + keyList[i]);
					var inList = false;
					for (var j = 0; inList == false && j < keywordElements.length; j++) {
						if (keyList[i].trim() == keywordElements[j]) {
							inList = true;
						}
					}
					if (!inList) {
						keywordElements.push(keyList[i].trim());
					}
				}
			});

			$("meta[name='dc.Subject']").each(function (index) {
				var keyList = $(this).attr('content').split(';');
				for (var i = 0; i < keyList.length; i++) {
					console.log(i + ": " + keyList[i]);
					var inList = false;
					for (var j = 0; inList == false && j < keywordElements.length; j++) {
						if (keyList[i].trim() == keywordElements[j]) {
							inList = true;
						}
					}
					if (!inList) {
						keywordElements.push(keyList[i].trim());
					}
				}
			});

			$("span[class='Keyword']").each(function (index) {
				console.log(index + ": " + $(this).text());
				var inList = false;
				for (var j = 0; inList == false && j < keywordElements.length; j++) {
					if ($(this).text().trim() == keywordElements[j]) {
						inList = true;
					}
				}
				if (!inList) {
					keywordElements.push($(this).text().trim());
				}
			});

			chrome.storage.local.set({'keywordValues': keywordElements}, function() 
			{
				var error = chrome.runtime.lastError;
				if (error) 
				{
					console.error(error);
				}
			});

			console.log('----------AFFILIATION ELEMENTS----------');
			$("meta[name='citation_author_institution']").each(function (index) {
				console.log(index + ": " + $(this).attr('content'));
				var inList = false;
				for (var j = 0; inList == false && j < affiliationElements.length; j++) {
					if ($(this).attr('content').trim() == affiliationElements[j]) {
						inList = true;
					}
				}
				if (!inList) {
					affiliationElements.push($(this).attr('content').trim());
				}
			});

			chrome.storage.local.set({ 'affiliationValues': affiliationElements }, function () {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});

			// title
			console.log('----------PAPER TITLE----------');
			//articleElements = Array();  // 0 = paper title, 1 = publication title, 2 = publication type, 3 = abstract
			var titleFound = false;
			$("meta[name='citation_title']").each(function (index) {
				console.log(index + ": " + $(this).attr('content'));
				if (!titleFound) {
					titleFound = true;
					articleElements[0] = $(this).attr('content').trim();
				}
			});

			if (!titleFound) {
				$("meta[name='dc.Title']").each(function (index) {
					console.log(index + ": " + $(this).attr('content'));
					if (!titleFound) {
						titleFound = true;
						articleElements[0] = $(this).attr('content').trim();
					}
				});
			}

			if (!titleFound) {
				$("h1[class='citation__title']").each(function (index) {
					console.log(index + ": " + $(this).text());
					if (!titleFound) {
						titleFound = true;
						articleElements[0] = $(this).text().trim();
					}
				});
			}

			console.log('----------PUBLICATION VENUE----------');
			var pubFound = false;
			$("meta[name='citation_conference_title']").each(function (index) {
				console.log(index + ": " + $(this).attr('content'));
				if (!pubFound) {
					pubFound = true;
					articleElements[1] = $(this).attr('content').trim();
					articleElements[2] = "CONFERENCE PROCEEDINGS";
				}
			});

			if (!pubFound) {
				$("meta[name='citation_journal_title']").each(function (index) {
					console.log(index + ": " + $(this).attr('content'));
					if (!pubFound) {
						pubFound = true;
						articleElements[1] = $(this).attr('content').trim();
						articleElements[2] = "JOURNAL ARTICLE";
					}
				});
			}

			if (!pubFound) {
				$("span[class='issue-heading']").each(function (index) {
					console.log(index + ": " + $(this).text());
					if (!pubFound) {
						pubFound = true;
						articleElements[1] = "";
						articleElements[2] = $(this).text().trim().toUpperCase();
					}
				});
			}

			if (!pubFound) {
				articleElements[1] = "";
				articleElements[2] = "";
			}

			// abstract
			console.log('----------ABSTRACT----------');
			var absFound = false;
			$("meta[name='dc.Description']").each(function (index) {
				console.log(index + ": " + $(this).attr('content'));
				if (!absFound) {
					absFound = true;
					articleElements[3] = $(this).attr('content').trim();
				}
			});

			var responseArray = Array();
			responseArray[0] = authorElements;
			responseArray[1] = keywordElements;
			responseArray[2] = affiliationElements;

			// 0 = paper title, 1 = publication title, 2 = publication type, 3 = abstract, 4 = pub rank
			articleElements[4] = 0;
			if (articleElements[1] !== undefined && articleElements.length > 1) {
				var pubName = articleElements[1].split(" ").join("+");
				$.get('https://scholar.google.com/citations?hl=en&view_op=search_venues&vq=' + pubName, function (response) {
					//console.log(response);
					console.clear();
					var cutBy = '<td class="gsc_mvt_t">' + articleElements[1] + '</td>';
					//console.log(cutBy);
					var splitUp = response.split(cutBy);
					if (splitUp.length < 2) {
						cutBy = '<td class="gsc_mvt_t">' + articleElements[1].split("-").join(" ") + '</td>';
						splitUp = response.split(cutBy);
					}
					//console.log(splitUp.length);
					if (splitUp.length > 1) {
						cutBy = '</a>';
						var split2 = splitUp[1].split(cutBy);
						if (split2.length > 1) {
							//console.log(split2[0]);
							var split3 = split2[0].split('gsc_mp_anchor">');
							//console.log(split3);
							if (split3.length > 1) {
								articleElements[4] = split3[1];
								//console.log(split3[1]);
							}
						}
					}
					console.log('array value=' + articleElements[4]);
					//alert("done1");

				//}).done(function () {
					chrome.storage.local.set({ 'articleValues': articleElements }, function () {
						var error = chrome.runtime.lastError;
						if (error) {
							console.error(error);
						}
					});

				//	var responseArray = Array();

					responseArray[3] = articleElements;
				//	//alert(articleElements[4]);
					sendResponse(responseArray);
				//	//alert("done2");
				});
			}

			chrome.storage.local.set({ 'articleValues': articleElements }, function () {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});

			responseArray[3] = articleElements;
			sendResponse(responseArray);
		}
	}
);


