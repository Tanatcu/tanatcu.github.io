angular.module('service.comment', []).service('Comment', comment);

comment.$inject = ['$storage', 'Item'];

function comment($storage, Item) {

	this.list = function (id) {
		var list = $storage.list('comments');

		return list.filter(function (comment) {
			return comment.postId === id
		})
	};

	this.create = function (comment) {
		var post = Item.get(comment.postId);

		post.commentCount += 1;

		Item.update(comment.postId, post);

		$storage.create('comments', comment);

		return this.list(comment.postId)
	};

	this.get = function (id) {
		return $storage.get('comments', id)
	};

	this.delete = function () {
		return $storage.delete('comments', id)
	};
}
