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
			
			console.log('----------AUTHOR LINK ELEMENTS----------');

			$("meta[property='article:author']").each(function (index) 
			{
				var authList = $(this).attr('content').split(', ');
				for (var i = 0; i < authList.length; i++) {
					console.log(i + ": " + authList[i]);
					authorElements.push(authList[i]);
				}
			});

			chrome.storage.local.set({'authorValues': authorElements}, function() 
			{
				var error = chrome.runtime.lastError;
				if (error) 
				{
					console.error(error);
				}
			});
			
			console.log('----------KEYWORD LINK ELEMENTS----------');
			$("a[class='attributes']").each(function(index) 
			{
				console.log( index + ": " + $( this ).text());
				keywordElements.push($(this).text());
			});

			chrome.storage.local.set({'keywordValues': keywordElements}, function() 
			{
				var error = chrome.runtime.lastError;
				if (error) 
				{
					console.error(error);
				}
			});
		}
	}
);


