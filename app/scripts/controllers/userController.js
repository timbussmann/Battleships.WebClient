'use strict'
angular.module('battleships').controller('userController', function($scope, userService){
    $scope.username = userService.username; //todo there is no automatic two way binding for username. use watch or introduce dto object
});