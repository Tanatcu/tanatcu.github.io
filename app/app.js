angular.module('spa', [
	'router',
	'config.toast',
	'storage',

	'service.item',
	'service.comment',
	'directives.todoItems',
	'directives.commentList',
	'ctrlSubmit'
]);
