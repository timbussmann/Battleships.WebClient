angular.module('battleships').service('userService', function(){
    this.username = 'player' + Math.floor(Math.random() * 10001);
});