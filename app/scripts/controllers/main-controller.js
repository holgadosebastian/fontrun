'use strict';

angular.module('fontRunApp')
  .controller('MainCtrl', [
    'RandomContentSrv',
  	function ( RandomContentSrv ) {
      var self = this;

      self.setRandomWords = function() {
        self.randomWords = RandomContentSrv.getRandomWords(30);
      };

      self.setBlogPosts = function() {
        var blogPosts = [];

        for (var i = 0; i < 3; i++) {
          blogPosts.push(
            {
              title: RandomContentSrv.getRandomTitle(),
              subtitle: RandomContentSrv.getRandomTitle(),
              description: RandomContentSrv.getRandomDescription()
            }
          );
        }

        self.blogPosts = blogPosts;
      };

      // Init page random words
      self.setRandomWords();
      self.setBlogPosts();
  	}
  ]);
