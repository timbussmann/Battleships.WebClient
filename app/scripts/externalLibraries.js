angular.module('battleships').value('toastr', toastr).run(function($rootScope, toastr, serverUrl){
    if ($.connection) {
        $.connection.hub.url = serverUrl + 'signalr';
        var hub = $.connection.gameHub;
        hub.client.update = function (updatedGameId) {
            $rootScope.$broadcast('gameUpdated', updatedGameId);
        };

        $.connection.hub.start().done(function () {
            toastr.info('established hub connection')
        });
    } else {
        toastr.error('could not load hub data. Check if the server is running and the url is correct');
    }
});