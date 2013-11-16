angular.module('battleships')
    .value('toastr', toastr)
    .run(function(serverUrl){
        try{
            $.connection.hub.url = serverUrl + 'signalr';
            var hub = $.connection.gameHub;
            hub.client.update = function (updatedGameId) {
                toastr.info('game update event received');
            };

            $.connection.hub.start().done(function () {
                toastr.info('established hub connection');
            });
        } catch(err){
            toastr.error('SignalR server not found');
        }
});