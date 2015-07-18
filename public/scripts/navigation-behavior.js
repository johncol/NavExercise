(function () {

	/**
	 * index IDs
	 */
	var navigationElementID = 'main-nav',
		logoID = 'main-logo';

	/**
	 * index classes
	 */
	var clickedItemClass = 'active-menu-item',
		translucentMaskClass = 'translucent-mask',
		menuDisplayClass = 'with-menu-visible',
		itemWithSubitemsClass = 'with-children';

	/**
	 * index elements
	 */
	var navigation = document.getElementById(navigationElementID),
		navigationList = document.getElementById(navigationElementID).children[0],
		navigationButton = document.getElementById(logoID).children[1],
		translucentMask = document.getElementsByClassName(translucentMaskClass)[0];

	/**
	 * Returns navigation items
	 * @return {Promise[Array]}
	 */
	var loadNavigationItems = function () {
		var loader = new NavigationItemsLoader();
		return loader.itemsPromise;
	};

	/**
	 * Looks for all the primary menu items, and removes the active class
	 */
	var removeActiveItemClassFromAllItems = function () {
		var listItems = navigationList.children;
		for (var i = 0; i < listItems.length; i++) {
			listItems[i].children[0].classList.remove(clickedItemClass);
		}
	};

	/**
	 * Shows/hiddes the translucent mask given the visible parameter value
	 * @param  {boolean} visible
	 */
	var toggleTranslucentMask = function (visible) {
		translucentMask.style.display = visible ? 'block' : 'none';
	};

	/**
	 * Removes all active classes from menu items and adds it to the one that was clicked
	 * @param  {Event} Click Event
	 */
	var toggleClickedItemClass = function (event) {
		removeActiveItemClassFromAllItems();
		event.target.classList.add(clickedItemClass);
		toggleTranslucentMask(event.target.nextSibling != null);
	};

	/**
	 * Adds list item elements to the list element
	 * @param {List Element} list
	 * @param {Array[ListItem Element]} items
	 */
	var addItemsToNavigationList = function (list, items) {
		items.forEach(function (item) {
			addNavigationItem(list, item);
		});
	};

	/**
	 * Creates a list elements, adds items to it, and adds the list to a list container element
	 * @param {List Item Element} listContainer
	 * @param {Array} items
	 */
	var addInnerList = function (listContainer, items) {
		var innerList = document.createElement('ul');
		addItemsToNavigationList(innerList, items);
		listContainer.appendChild(innerList);
	};
	
	/**
	 * Adds a list item element to the list element
	 * @param {List Element} list
	 * @param {ListItem Element} item
	 */
	var addNavigationItem = function (listElement, itemData) {
		var item = document.createElement('li');
		var anchor = document.createElement('a');
		var itemLabel = document.createTextNode(itemData.label);
		anchor.appendChild(itemLabel);
		item.appendChild(anchor);
		item.addEventListener('click', toggleClickedItemClass);
		if (itemData.items && itemData.items.length > 0) {
			item.classList.add(itemWithSubitemsClass);
			addInnerList(item, itemData.items);
		} else {
			anchor.href = itemData.url;
		}
		listElement.appendChild(item);
	};

	document.body.addEventListener('click', function (event) {
		if (event.target.nodeName != 'A') {
			removeActiveItemClassFromAllItems();
			toggleTranslucentMask(false);
		}
	});

	navigationButton.addEventListener('click', function (event) {
		event.target.parentNode.classList.toggle(menuDisplayClass);
		navigation.classList.toggle(menuDisplayClass);
	});

	loadNavigationItems().then(function (navigationItems) {
		addItemsToNavigationList(navigationList, navigationItems);
	});

})();
