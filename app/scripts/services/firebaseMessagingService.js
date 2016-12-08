angular.module('testApp').factory("FirebaseMessaging", ["$http",
  function($http) {

  	var self = this;
	var messaging = firebase.messaging();
	var NOTIFICATION_URL = "https://fcm.googleapis.com/fcm/send"

	//ATTENZIONE SOLO PER TEST, MAI TENERE LA SERVER KEY SU UN CLIENT!!! SOLO LATO SERVER, è IL SERVER CHE MANDA NOTIFICHE
	var SECRET_SERVER_KEY = "AAAAmG95pTI:APA91bEe7bUOlhRVxqxGvPF_0ywJgrIcKi3VsbNJt90rUy26Mz_ZT1k3UGd-1CkquR1XQv0Ky4wnOuPrijOVGzzmxZbQ7YjPZ6e1nZY-6wHNE-QpgVRLQ4DhDDjGsOfFGU8lJbKChfhCqkQy6ooo85bXLCey33UeYw"

  	self.subscribe = function (successCallback) {
		messaging.requestPermission()
		.then(function() {
			console.log('Notification permission granted.');
			return messaging.getToken();
		})
		.then(function(token) {
			console.log(token);
			self.token = token;
			successCallback(messaging);
		})
		.catch(function(err) {
			console.log('Unable to get permission to notify.', err);
		});
		
  	}

  	self.createTopic = function(topicName, successCallback) { 
  		$http({
		  method: 'POST',
		  url: "https://iid.googleapis.com/iid/v1/" + self.token + "/rel/topics/" + topicName,
		  headers: {
		   'Content-Type': "application/json",
		   'Authorization': "key=" + SECRET_SERVER_KEY
		  },
		}).then(function(response) {
			console.info("FirebaseMessaging createTopic - success " + topicName)
			successCallback();
		}, function(response) {
			console.error("FirebaseMessaging createTopic - ERROR" + topicName)
		});
  	}

	self.sendNotification = function(notification, topicName) {
		notification.icon = "/images/yeoman.png"
		sendMessage("notification", notification, topicName);
	}

	self.sendData = function(data, topicName) {
		sendMessage("data", data, topicName);
	}

	function sendMessage(messageType, body, topicName) {
		var request = {
			"to" : "/topics/" + topicName
		}

		request[messageType] = body;
		console.info("FirebaseMessaging sendMessage " + JSON.stringify(request))

		$http({
		  method: 'POST',
		  url: NOTIFICATION_URL,
		  headers: {
		   'Content-Type': "application/json",
		   'Authorization': "key=" + SECRET_SERVER_KEY
		  },
		  data : request
		}).then(function successCallback(response) {
			console.info("FirebaseMessaging sendMessage - success")
		}, function errorCallback(response) {
			console.error("FirebaseMessaging sendMessage - ERROR")
		});
	}

	return self;
}]);