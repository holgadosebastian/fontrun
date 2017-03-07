'use strict';

angular.module('fontRunApp')
  .controller('MainCtrl', [
    '$rootScope',
    '$filter',
    'RandomContentSrv',
    'view',
  	function ( $rootScope, $filter, RandomContentSrv, view ) {
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
        self.randomWords = [];
        self.randomWords = _.map( RandomContentSrv.getRandomWords(30), function( word ) {
          return { word: word, style: getRandomStyle() };
        });
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

      // Private functions
      function getRandomStyle() {
        var fontWeights = [300, 400, 700];
        var colors = ['--primary-color', '--secondary-color', '--tertiary-color'];
        var fontFamilies = ['--primary-font', '--secondary-font'];
        var styles = [
          'font-weight:' + _.sample(fontWeights),
          'font-family: var(' + _.sample(fontFamilies) + ')',
          'color: var(' + _.sample(colors) + ')'
        ];
        var fontStyle = Math.random() < 0.5 ? true : false;

        if ( fontStyle ) {
          styles.push('font-style: italic');
        }

        return styles.join(';');
      }
  	}
  ]);
