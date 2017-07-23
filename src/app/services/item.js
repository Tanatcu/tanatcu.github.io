angular.module('service.item', []).service('Item', item);

item.$inject = ['$storage'];

function item($storage) {

	this.list = function () {
		return $storage.list('items')
	};

	this.create = function (record) {
		record.commentCount = 0;
		return $storage.create('items', record)
	};

	this.get = function (id) {
		return $storage.get('items', id)[0]
	};

	this.update = function (id, model) {
		return $storage.update('items', id, model)
	};

	this.removeComments = function (postId) {
		var comments = $storage.list('comments');

		comments.map(function (item) {
			if (item.postId === postId) {
				$storage.delete('comments', item.id)
			}
		});
	};

	this.delete = function (id) {
		this.removeComments(id);

		return $storage.delete('items', id)
	};
}