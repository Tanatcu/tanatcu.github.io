angular.module('config.toast', ['ngAnimate', 'toastr']).config(toastConfig);

toastConfig.$inject = ['toastrConfig'];

function toastConfig(toastrConfig) {
	angular.extend(toastrConfig, {
		autoDismiss: false,
		containerId: 'toast-container',
		maxOpened: 2,
		newestOnTop: true,
		positionClass: 'toast-top-right',
		preventDuplicates: false,
		preventOpenDuplicates: true,
		target: 'body'
	});
}