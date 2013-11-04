'use strict'
angular.module('battleships', []
    ).config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'lobbyController',
                templateUrl: '/views/lobbyView.html' })
            .when('/game/:gameId/:username', {
                controller: 'gameController',
                templateUrl: '/views/gameView.html' })
            .otherwise({
                redirectTo: '/' });

        $locationProvider.html5Mode(true);
        }
    ).constant('serverUrl', 'http://localhost:58885/');