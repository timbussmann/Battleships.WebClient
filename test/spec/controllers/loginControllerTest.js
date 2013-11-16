'use strict'
describe('Login Controller', function(){
    var scope, $rootScope;

    beforeEach(module('battleships'));
    beforeEach(inject(function(_$rootScope_, $controller){
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        $controller('loginController', {
            $scope: scope
        });
    }));

    it('a spec', function(){
        expect(true).toBe(true);
    });

    describe('a nested suite', function(){

        it('a nested spec', function(){
            expect(true).toBe(false);
        });
    });
});