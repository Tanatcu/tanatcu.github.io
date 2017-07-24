angular.module('storage', []).service('$storage', storage);

storage.$inject = ['$window'];

function storage($window) {

	/**
	 * Getting list of instances
	 * @params {string} instance - keyword of storage data
	 */
	this.list = function (instance) {
		return JSON.parse($window.localStorage.getItem(instance)) || [];
	};

	/**
	 * Creating record to storage by instancecommentCount
	 * Used Date object for creating random unique id
	 * @param instance
	 * @param {object} model
	 */
	this.create = function (instance, model) {
		var date = new Date();
		var storageData = JSON.parse($window.localStorage.getItem(instance)) || [];

		model.id = date.getTime();

		storageData.push(model);
		$window.localStorage.setItem(instance, JSON.stringify(storageData));

		return this.list(instance);
	};

	/**
	 * Getting record by id
	 * @param instance
	 * @param id
	 * @return {Array} of items
	 */
	this.get = function (instance, id) {
		var storageData = JSON.parse($window.localStorage.getItem(instance)) || [];

		return storageData.filter(function (item) {
			return item.id === id;
		});
	};

	/**
	 * Updating record
	 * @param {string} instance
	 * @param {number} id
	 * @param {object} model
	 * @return {array} updated array of records
	 */
	this.update = function (instance, id, model) {
		var storageData = JSON.parse($window.localStorage.getItem(instance)) || [];

		storageData.map(function (item, i) {
			if (item.id === id) {
				storageData[i] = model;
			}
		});

		$window.localStorage.setItem(instance, JSON.stringify(storageData));

		return this.list(instance);
	};

	/**
	 * Deleting record by id
	 * @param {string} instance
	 * @param {number} id
	 * @return {array} updated array of records
	 */
	this.delete = function (instance, id) {
		var storageData = JSON.parse($window.localStorage.getItem(instance)) || [];

		storageData.map(function (item, i) {
			if (item.id === id) {
				storageData.splice(i, 1);
			}
		});

		$window.localStorage.setItem(instance, JSON.stringify(storageData));

		return this.list(instance);
	};
}