var azure = require("azure");

module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item - \n', myQueueItem);
    var notificationHubService = azure.createNotificationHubService(process.env["HUB_NAME"], process.env["HUB_CONNECTION_STRING"]);

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
