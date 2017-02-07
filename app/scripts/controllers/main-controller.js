'use strict';

angular.module('fontRunApp')
  .controller('MainCtrl', [
    'RandomWordSrv',
  	function ( RandomWordSrv ) {
      this.randomWords = RandomWordSrv.getRandomWords(30);
  	}
  ]);
