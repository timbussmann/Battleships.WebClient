'use strict'
angular.module('battleships', []
    ).config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'loginController',
                templateUrl: '/views/loginView.html' })
            .when('/lobby/:username', {
                controller: 'lobbyController',
                templateUrl: '/views/lobbyView.html'
            })
            .when('/game/:gameId/:username', {
                controller: 'gameController',
                templateUrl: '/views/gameView.html' })
            .when('/servernotfound', {
                templateUrl: 'views/serverNotFoundView.html'
            })
            .otherwise({
                redirectTo: '/' });

        //$locationProvider.html5Mode(true);
        }
).filter('mapToBoardColors', function() {
        return function(board){
            return _.map(board, function(row){
                return _.map(row, function(field){
                    return field > 0 ? 4 : field < 0 ? 5 : 0;
                });
            });
        }
    }
).constant('serverUrl', 'http://localhost:58886/');