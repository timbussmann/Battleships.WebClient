angular.module('battleships').controller('loginController', function($scope, $location){

    $scope.confirm = function(){
        if($scope.username){
            $location.path('/lobby/' + $scope.username);
        } else{
            $scope.error = 'please enter a username to continue';
        }
    };

    $scope.generateRandomName = function(){
        $scope.username = 'player' + Math.floor(Math.random() * 10001);
    };
});
