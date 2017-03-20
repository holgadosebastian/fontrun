(function() {
	'use strict';

	angular
		.module('fontRunApp')
	  .component('modal', {
			transclude: true,
	    templateUrl: 'components/modal/modal.html',
			bindings: {
				showModal: '=',
				title: '@'
			},
	    controller: [
				'$rootScope',
	      ModalController
	    ]
	  });

	  function ModalController( $rootScope ) {
			var vm = this;

			$rootScope.$on( 'modal.close', function( event, data ) {
				vm.showModal = false;
				event.stopPropagation();
			});
		}

})();
