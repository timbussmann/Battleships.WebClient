'use strict'
describe('Login Controller', function(){
    var scope, $rootScope, $location;

    beforeEach(module('battleships'));
    beforeEach(inject(function(_$rootScope_, _$location_, $controller){
        $rootScope = _$rootScope_;
        $location = _$location_;
        scope = $rootScope.$new();

        $controller('loginController', {
            $scope: scope,
            $location: $location
        });
    }));

    describe('when user enters valid username', function(){
        var expectedUsername = 'Chuck Norris';

        beforeEach(function(){
            spyOn($location, 'path');


            scope.username = expectedUsername;
            scope.confirm();
        });

        it('should navigate to lobby when user enters valid username', function(){
            expect($location.path).toHaveBeenCalledWith('/lobby/' + expectedUsername);
        });
    });

    describe('when user provides no username', function(){

        beforeEach(function(){
            spyOn($location, 'path');

            scope.confirm();
        });

        it('should navigate to lobby when user enters valid username', function(){
            expect($location.path).not.toHaveBeenCalled();
        });

        it('should display a warning to the user', function(){
            expect(scope.error).toBe('please enter a username to continue');
        });
    });

    describe('when user generates random username', function(){

        beforeEach(function(){
            scope.generateRandomName();
        });

        it('should set the generated username', function(){
            expect(scope.username).not.toBeUndefined();
        });

        it('should generate new username each time', function(){
            var firstName = scope.username;
            scope.generateRandomName();

            expect(scope.username).not.toBe(firstName);
        });
    });
});