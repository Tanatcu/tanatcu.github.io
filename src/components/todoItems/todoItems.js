angular.module('directives.todoItems', []).directive('todoItems', todoItems);

function todoItems() {
	return {
		templateUrl: 'views/todoItems/todoItems.html',
		scope: {},
		replace: true,
		controller: todoItemsCtrl
	}
}

todoItemsCtrl.$inject = ['$scope', 'Item', 'toastr'];

function todoItemsCtrl($scope, Item, toastr) {
	$scope.items = Item.list();
	$scope.activeItemId = '';

	$scope.item = {};

	$scope.addItem = function (item) {
		if (!item.name) {
			toastr.error('Please, type a name');
			return false;
		}

		$scope.items = Item.create(item);
		$scope.item.name = '';
	};

	$scope.showItem = function (item, index) {
		$scope.activeItemId = item.id;
		$scope.$parent.$broadcast('showComments', {id: item.id, index: index});
	};

	$scope.delete = function (id) {
		$scope.items = Item.delete(id);

		if (id === $scope.activeItemId) {
			$scope.$parent.$broadcast('postRemoved');
		}
	};

	$scope.$on('increaseCommentCount', function (scope, id) {
		$scope.items = $scope.items.map(function (item) {
			if (item.id === id) {
				return {
					commentCount: item.commentCount + 1,
					id: item.id,
					name: item.name
				}
			}

			return item
		});
	})
}
