angular.module('directives.commentList', []).directive('commentList', commentList);

function commentList() {
	return {
		templateUrl: 'app/components/commentList/commentList.html',
		scope: {},
		replace: true,
		controller: commentListCtrl
	}
}

commentListCtrl.$inject = ['$scope', 'Comment', 'toastr'];

function commentListCtrl($scope, Comment, toastr) {
	$scope.comments = [];
	$scope.comment = {};

	$scope.addComment = function (comment) {
		if (!comment.text) {
			toastr.error('Please, type a text');
			return false;
		}

		comment.color = comment.color || '#e6e6e6';

		comment.postId = $scope.postId;
		$scope.comments = Comment.create(comment);

		$scope.comment = {};

		$scope.$parent.$broadcast('increaseCommentCount', $scope.postId)
	};

	$scope.deleteComment = function (comment) {
		$scope.comments = Comment.delete(comment);
		$scope.$parent.$broadcast('decreaseCommentCount', $scope.postId)
	};

	$scope.$on('showComments', function (scope, id) {
		$scope.postId = id;

		$scope.comments = Comment.list(id);
	});

	$scope.$on('postRemoved', function () {
		$scope.postId = null;
	});
}