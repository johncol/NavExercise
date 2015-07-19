'use strict';

/**
 * NavigationItemsLoader
 * Loads navigation items from nav.json json file and saves the promise in itemsPromise
 */
function NavigationItemsLoader() {

	this.constructor = function () {
		var navItemsJSON = '/api/nav.json';
		this.itemsPromise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', navItemsJSON, true);
			request.onreadystatechange = function (aEvt) {
				if (request.readyState == 4) {
					if (request.status == 200) {
						resolve(JSON.parse(request.responseText).items);
					} else {
						reject('An error occurred when trying to load navigation items');
					}
				}
			};
			request.send(null);
		});
	};

	this.constructor();

};
