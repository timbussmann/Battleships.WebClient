'use strict'
describe('Game Controller', function(){
    var scope, $rootScope, $httpBackend, $routeParams, serverUrl, gameId, username;
    serverUrl = '/testServerUrl/';
    gameId = 'testGameId';
    username = 'testUsername';
    var toastrStub = {
        info: function(){},
        error: function(){},
        success: function(){}
    };

    beforeEach(module('battleships'));
    beforeEach(inject(function(_$httpBackend_, _$rootScope_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    describe('initialization', function(){
        it('should load board from server', function(){
            var serverData = {
                Players: [{Name: 'player1'}, {Name: username}]
            };

            $httpBackend.whenGET(serverUrl + 'game/' + gameId).respond(serverData);

            createController();
            $httpBackend.flush();

        expect(scope.player).toBe(serverData.Players[1]);
        expect(scope.enemy).toBe(serverData.Players[0]);
        });
    });

    describe('after initialization', function(){
        beforeEach(function(){
            var gameData = {
                Players: [{Name: 'player1'}, {Name: 'player2'}]
            };
            $httpBackend.whenGET(serverUrl + 'game/' + gameId).respond(gameData);
            createController();
            $httpBackend.flush();
        });

        it('should reload board on update event with same gameId', function(){
            $httpBackend.expectGET(serverUrl + 'game/' + gameId);

            $rootScope.$broadcast('gameUpdated', gameId);
            $httpBackend.flush();
        });

        it('should not reload board on update event with other gameId', function(){
            $rootScope.$broadcast('gameUpdated', 'anotherGameId');
        });

        it('should bomb selected enemy position', function(){
            $httpBackend.expectPUT(serverUrl + 'game/' + gameId + '/player1/board/4;2')
                .respond();

            scope.bomb(4, 2);

            $httpBackend.flush();
        });

        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        })
    });


    function createController(){
        inject(function($controller){
            scope = $rootScope.$new();
            $routeParams = {
                gameId: gameId,
                username: username
            };

            $controller('gameController', {
                $scope: scope,
                $routeParams: $routeParams,
                serverUrl: serverUrl,
                toastr: toastrStub
            });
        });
    }
});
