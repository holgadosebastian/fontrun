'use strict';

angular.module('fontRunApp')
  .controller('MainCtrl', [
    'RandomWordSrv',
  	function ( RandomWordSrv ) {
      this.randomWords = RandomWordSrv.getRandomWords(30);

      this.loadRandomWords = function() {
        this.randomWords = RandomWordSrv.getRandomWords(30);
      };
  	}
  ]);
