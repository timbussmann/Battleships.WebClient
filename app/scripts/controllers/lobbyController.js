'use strict'
angular.module('battleships').controller('lobbyController', function (
    $scope, $http, $location, serverUrl, toastr, $routeParams) {
    var username = $routeParams.username;
    var board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    var shipsToUse = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];

    $scope.board = board;
    $scope.availableShips = shipsToUse.slice(0);
    var selected;
    $scope.select = function (x, y) {
        if (!selected) {
            if (board[y][x] === 0) {
                selected = {x: x, y: y};
                board[y][x] = -1;
            }
        } else {
            var shipSelected = false;
            var current = {x: x, y: y};
            var minX = _.min([selected, current],function (position) {
                return position.x
            }).x;
            var maxX = _.max([selected, current],function (position) {
                return position.x
            }).x;
            var minY = _.min([selected, current],function (position) {
                return position.y
            }).y;
            var maxY = _.max([selected, current],function (position) {
                return position.y
            }).y;

            if (minX === maxX) {
                var distance = maxY - minY + 1;
                if (_.contains($scope.availableShips, distance)) {
                    for (var i = minY; i <= maxY; i++) {
                        board[i][x] = $scope.availableShips.length;
                    }
                    removeShipWithLength(distance);
                    shipSelected = true;
                }
            } else if (minY === maxY) {
                var distance = maxX - minX + 1;
                if (_.contains($scope.availableShips, distance)) {
                    for (var i = minX; i <= maxX; i++) {
                        board[y][i] = $scope.availableShips.length;
                    }
                    removeShipWithLength(distance);
                    shipSelected = true;
                }
            }

            if (!shipSelected) {
                board[selected.y][selected.x] = 0;
            }
            selected = undefined;
        }
    };

    $scope.joinGame = function () {
        var allCoordinates = [];
        for (var y = 0; y < board.length; y++) {
            for (var x = 0; x < board.length; x++) {
                allCoordinates.push({x: x, y: y});
            }
        }
        var shipCoordinates = _.filter(allCoordinates, function (item) {
            return board[item.y][item.x] > 0;
        });

        var groupedCoordinates = _.groupBy(shipCoordinates, function (item) {
            return board[item.y][item.x];
        });

        var ships = _.map(groupedCoordinates, function (group) {
            return group;
        });

        $scope.showLoadingScreen = true;
        $http.post(serverUrl + 'game', {
            Name: username,
            Ships: ships
        }).success(function (result) {
                $scope.showLoadingScreen = false;
                toastr.success('joining game ' + result.GameId);
                $location.path('/game/' + result.GameId + '/' + username);
            }).error(function (error) {
                $scope.showLoadingScreen = false;
                toastr.error(error.ExceptionMessage, error.Message);
            });
    };

    $scope.randomShips = function(){
        board[0][0] = 1;
        board[1][0] = 1;
        board[2][0] = 1;
        board[3][0] = 1;
        board[4][0] = 1;

        board[0][1] = 2;
        board[1][1] = 2;
        board[2][1] = 2;
        board[3][1] = 2;

        board[0][2] = 3;
        board[1][2] = 3;
        board[2][2] = 3;
        board[3][2] = 3;

        board[0][3] = 4;
        board[1][3] = 4;
        board[2][3] = 4;

        board[0][4] = 5;
        board[1][4] = 5;
        board[2][4] = 5;

        board[0][5] = 6;
        board[1][5] = 6;
        board[2][5] = 6;

        board[0][6] = 7;
        board[1][6] = 7;

        board[0][7] = 8;
        board[1][7] = 8;

        board[0][8] = 9;
        board[1][8] = 9;

        board[0][9] = 10;
        board[1][9] = 10;

        $scope.availableShips.splice(0, $scope.availableShips.length);
    };

    $scope.resetShips = function(){
        for(var i = 0; i < 10; i++){
            for(var j = 0; j < 10; j++){
                board[i][j] = 0;
            }
        }

        $scope.availableShips = shipsToUse.slice(0);
    };

    function removeShipWithLength(distance) {
        var index = $scope.availableShips.indexOf(distance);
        $scope.availableShips.splice(index, 1);
    }

    $scope.range = function(n) {
        return new Array(n);
    };
});