'use strict';

angular.module('fontRunApp')
  .controller('MainCtrl', [
    '$rootScope',
    'RandomContentSrv',
    'view',
  	function ( $rootScope, RandomContentSrv, view ) {
      $rootScope.view.current = view;

      var self = this;

      self.setSkills = function() {
        var skills = [];

        for (var i = 0; i < 3; i++) {
          skills.push(
            {
              title: RandomContentSrv.getRandomTitle(),
              description: RandomContentSrv.getRandomDescription().substring(0, 130) + '.'
            }
          );
        }

        self.skills = skills;
      };

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
      self.setSkills();
      self.setRandomWords();
      self.setBlogPosts();
  	}
  ]);
