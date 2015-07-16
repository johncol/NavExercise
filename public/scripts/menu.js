(function () {

	var navigationElementID = 'main-nav';
	var navItemsJSON = 'nav.json';

	/**
	 * Returns navigation items from navItemsJSON json file
	 * @return Array
	 */
	var loadNavigationItems = function () {
		var request = new XMLHttpRequest();
		request.open('GET', navItemsJSON, false);
		var navigation;
		request.onreadystatechange = function (aEvt) {
			if (request.readyState == 4) {
				if (request.status == 200) {
					navigation = JSON.parse(request.responseText);
				} else {
					throw 'An error occurred when trying to load navigation items';
				}
			}
		};
		request.send(null);
		return navigation.items;
	};

	/**
	 * Returns DOM unordered list element for the main navigation
	 * @return List Element
	 */
	var getNavigationListElement = function () {
		return document.getElementById(navigationElementID).children[0];
	};

	/**
	 * Adds list item elements to the list element
	 * @param List Element list
	 * @param Array[ListItem Element] items
	 */
	var addItemsToNavigationList = function (list, items) {
		items.forEach(function (item) {
			addNavigationItem(list, item);
		});
	};
	
	/**
	 * Adds a list item element to the list element
	 * @param List Element list
	 * @param ListItem Element item
	 */
	var addNavigationItem = function (listElement, itemData) {
		var item = document.createElement('li');
		var anchor = document.createElement('a');
		var itemLabel = document.createTextNode(itemData.label);
		anchor.href = itemData.url;
		anchor.appendChild(itemLabel);
		item.appendChild(anchor);
		if (itemData.items && itemData.items.length > 0) {
			var innerList = document.createElement('ul');
			addItemsToNavigationList(innerList, itemData.items);
			item.appendChild(innerList);
		}
		listElement.appendChild(item);
	};

	var navigationList = getNavigationListElement();
	var navigationItems = loadNavigationItems();
	addItemsToNavigationList(navigationList, navigationItems);

})();