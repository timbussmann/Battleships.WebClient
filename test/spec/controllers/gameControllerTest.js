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
