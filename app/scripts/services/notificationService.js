angular.module('testApp').factory("NotificationService", [
  function() {
   
 	if (!("Notification" in window)) {
		console.info("This browser does not support desktop notification");
	}
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
		  // If the user accepts, let's create a notification
		  if (permission === "granted") {
		    console.info("accesso consentito");
		  }
		});
	}

    self.notify = function(notifyObject) {
	  if (Notification.permission === "granted") {
	    buildNotify(notifyObject);
	  }
    }

	/**
		notifyObject = {
			title: "string mandatory",
			options {
				Native option object not mandatory
			}
		}
	*/
    var buildNotify = function(notifyObject) {
    	new Notification(notifyObject.title, notifyObject.options);
    }
    
    return self;
  }
]);