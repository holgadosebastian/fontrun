(function() {
	'use strict';

	angular
		.module('fontRunApp')
	  .component('popup', {
			transclude: true,
	    templateUrl: 'components/popup/popup.html',
			bindings: {
				label: '@',
				title: '@',
				description: '@'
			},
	    controller: [
				'$scope',
				'$timeout',
	      PopupController
	    ]
	  });

	  function PopupController( $scope, $timeout ) {
			var vm = this;

			vm.$onInit = function() {
				$scope.$on( 'popup.show.' + vm.label, function() {
					vm.showPopup = true;

					$timeout( function() {
						vm.showPopup = false;
					}, 3000 );
				});
			};

		}

})();
