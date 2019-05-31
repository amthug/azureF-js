var azure = require("azure");

module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    var notificationHubService = azure.createNotificationHubService('hca-notification-hub','Endpoint=sb://hca-notification-ns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ZdzpGhWYuFDixDisOP2opxp34psyT64TTwY1nOm07Jg=');

    var payload = {
        data: {
          message: 'Helloooooooooooooo!'
        }
      };
      notificationHubService.gcm.send(null, payload, function(error){
        if(!error){
          context.log('chala gya gcm p.');
        }
      });

    var payload={
       alert: 'Helloooooooooo!'
     };
    notificationHubService.apns.send(null, payload, function(error){
      if(!error){
        context.log('chala gya apns p.');
      }
    });
    context.done();
};