angular.module('battleships').controller('gameController',
    function ($scope, $routeParams, $http, serverUrl, toastr) {
        var gameId = $routeParams.gameId;
        var username = $routeParams.username;

        loadBoard();
        $scope.gameId = gameId;

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
