var azure = require("azure");

module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item - \n', myQueueItem);
    var notificationHubService = azure.createNotificationHubService('hca-notification-hub', 'Endpoint=sb://hca-notification-ns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=ZdzpGhWYuFDixDisOP2opxp34psyT64TTwY1nOm07Jg=');

    var queueItemJson = myQueueItem;
    var notification = queueItemJson.notification;
    var tags = queueItemJson.tags;

    var gcmPayload = {
        data: {
          message: JSON.stringify(notification)
        }
      };
      notificationHubService.gcm.send(null, gcmPayload, function(error){
        if(!error){}
      });

    var apnsPayload={
       aps: {
         alert: {
           body: JSON.stringify(notification.text)
         },
         sound: 'default'
       },
       userInfo: JSON.stringify(notification)
     };
    notificationHubService.apns.send(null, apnsPayload, function(error){
      if(!error){}
    });
    context.done();
};