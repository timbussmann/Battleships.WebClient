'use strict'
describe('Lobby Controller', function(){
    var scope, $rootScope, $httpBackend, serverUrl, $location, userService;
    serverUrl = '/testServerUrl/';
    $location = {};
    userService = { username: 'testUsername' };
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
    beforeEach(createController);

    describe('after initialization', function(){
        it('should have empty board', function(){
            expect(scope.board.length).toBe(10);
            expect(scope.board[9].length).toBe(10);

            for(var y = 0; y < 10; y ++){
                for(var x = 0; x < 10; x++){
                    expect(scope.board[y][x]).toBe(0);
                }
            }
        });

        it('should have all available ships', function(){
            expect(scope.availableShips).toEqual([5, 4, 4, 3, 3, 3, 2, 2, 2, 2]);
        });
    });

    describe('when defining valid ship', function(){
        beforeEach(function(){
            scope.select(4, 2);
            scope.select(4, 5);
        });

        it('should set selected ship on board', function(){
            expect(scope.board[2][4]).toBeGreaterThan(0);
            expect(scope.board[3][4]).toBeGreaterThan(0);
            expect(scope.board[4][4]).toBeGreaterThan(0);
            expect(scope.board[5][4]).toBeGreaterThan(0);
        });

        it('should remove selected ship from available ships', function(){
            expect(scope.availableShips).toEqual([5, 4, 3, 3, 3, 2, 2, 2, 2]);
        });
    });

    describe('when defining invalid ship', function(){
        beforeEach(function(){
            scope.select(4, 2);
            scope.select(5, 5);
        });

        it('should not set a ship on board', function(){
            for(var y = 0; y < 10; y ++){
                for(var x = 0; x < 10; x++){
                    expect(scope.board[y][x]).toBe(0);
                }
            }
        });

        it('should have all available ships', function(){
            expect(scope.availableShips).toEqual([5, 4, 4, 3, 3, 3, 2, 2, 2, 2]);
        });
    });

    describe('when joining game', function(){

        beforeEach(function(){
            scope.randomShips();
        });

        it('should call server with username and selected ships', function(){
            $httpBackend.expectPOST(serverUrl + 'game', {
                Name: userService.username,
                Ships: [
                    [
                        {x: 0, y: 0},
                        {x: 0, y: 1},
                        {x: 0, y: 2},
                        {x: 0, y: 3},
                        {x: 0, y: 4}
                    ],
                    [
                        {x: 1, y: 0},
                        {x: 1, y: 1},
                        {x: 1, y: 2},
                        {x: 1, y: 3}
                    ],
                    [
                        {x: 2, y: 0},
                        {x: 2, y: 1},
                        {x: 2, y: 2},
                        {x: 2, y: 3}
                    ],
                    [
                        {x: 3, y: 0},
                        {x: 3, y: 1},
                        {x: 3, y: 2}
                    ],
                    [
                        {x: 4, y: 0},
                        {x: 4, y: 1},
                        {x: 4, y: 2}
                    ],
                    [
                        {x: 5, y: 0},
                        {x: 5, y: 1},
                        {x: 5, y: 2}
                    ],
                    [
                        {x: 6, y: 0},
                        {x: 6, y: 1}
                    ],
                    [
                        {x: 7, y: 0},
                        {x: 7, y: 1}
                    ],
                    [
                        {x: 8, y: 0},
                        {x: 8, y: 1}
                    ],
                    [
                        {x: 9, y: 0},
                        {x: 9, y: 1}
                    ]
                ]
            }).respond();

            scope.joinGame();
        });

        describe('when game joined', function(){
            it('should switch to game view', function(){
                expect(true).toBe(false);
            })
        });
    });

    describe('when resetShips called', function(){

        beforeEach(function(){
            scope.randomShips();
            scope.resetShips();
        });

        it('should have empty board', function(){
            expect(scope.board.length).toBe(10);
            expect(scope.board[9].length).toBe(10);

            for(var y = 0; y < 10; y ++){
                for(var x = 0; x < 10; x++){
                    expect(scope.board[y][x]).toBe(0);
                }
            }
        });

        it('should have all available ships', function(){
            expect(scope.availableShips).toEqual([5, 4, 4, 3, 3, 3, 2, 2, 2, 2]);
        });
    });



    function createController(){
        inject(function($controller){
            scope = $rootScope.$new();

            $controller('lobbyController', {
                $scope: scope,
                serverUrl: serverUrl,
                toastr: toastrStub,
                userService : userService
            });
        });
    }

});
