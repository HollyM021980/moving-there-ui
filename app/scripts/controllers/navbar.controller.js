angular.module('MovnThereUI')
  .controller('NavbarController', [
    '$scope',
    '$location',
    'AuthFactory',
    function($scope, $location, AuthFactory) {
      'use strict';

      $scope.isActive = function(viewLocation) {
          return viewLocation === $location.path();
      };

      $scope.logout = function() {
        AuthFactory.logout().success(function(response) {
          $location.path('/login');
        });
      };

      $scope.isLoggedIn = function() {
        return AuthFactory.isAuthenticated();
      };
    }
  ]
);
