(function() {
  'use strict';

  angular.module('fontRunApp')
    .controller('MainController', [
      '$rootScope',
      '$filter',
      'RandomContentSrv',
      'view',
      MainController
    ]);

    function MainController( $rootScope, $filter, RandomContentSrv, view ) {
      var vm = this;

      $rootScope.view.current = view;

      vm.setSkills = setSkills;
      vm.setRandomWords = setRandomWords;
      vm.setBlogPosts = setBlogPosts;

      // Init page random words

      vm.setSkills();
      vm.setRandomWords();
      vm.setBlogPosts();

      // Private functions

      function setSkills() {
        var skills = [];

        for (var i = 0; i < 3; i++) {
          skills.push(
            {
              title: RandomContentSrv.getRandomTitle(),
              description: RandomContentSrv.getRandomDescription().substring(0, 130) + '.'
            }
          );
        }

        vm.skills = skills;
      }

      function setRandomWords() {
        vm.randomWords = [];
        vm.randomWords = _.map( RandomContentSrv.getRandomWords(30), function( word ) {
          return { word: word, style: getRandomStyle() };
        });
      }

      function setBlogPosts() {
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

        vm.blogPosts = blogPosts;
      }

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

})();
