angular.module('battleships').controller('gameController',
    function ($scope, $routeParams, $http, serverUrl, toastr) {
        var gameId = $routeParams.gameId;
        var username = $routeParams.username;

        $scope.$on('gameUpdated', function(event, updatedGameId){
            if(updatedGameId===gameId){
                $scope.$apply(loadBoard());
            } else {
                toastr.info('game ' + gameId + ' was updated. but not this one :(');
            }
        });

        loadBoard();
        $scope.gameId = gameId;

        $scope.bomb = function (x, y) {
            $http.put(serverUrl + 'game/' + gameId + '/' + $scope.enemy.Name + '/board/' + x + ';' + y).success(function (result) {
                loadBoard();
            }).error(function(err){
                    toastr.error(err);
                });
        };

        function loadBoard() {
            $http.get(serverUrl + 'game/' + gameId).success(function (game) {
                $scope.game = game;
                $scope.enemy = game.Players[0].Name === username ? game.Players[1] : game.Players[0];
                $scope.player = game.Players[0].Name === username ? game.Players[0] : game.Players[1];
            }).error(function (err) {
                    toastr.error(err);
                });
        }
    });
