angular.module('battleships')
    .value('toastr', toastr)
    .run(function($rootScope, serverUrl, $location){
        try{
            $.connection.hub.url = serverUrl + 'signalr';
            var hub = $.connection.gameHub;
            hub.client.update = function (updatedGameId) {
                $rootScope.$broadcast('gameUpdated', updatedGameId);
            };

            $.connection.hub.start().done(function () {
                toastr.info('established hub connection')
            });
        } catch(err){
            $location.path('/servernotfound');
        }
});