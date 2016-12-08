'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:FirebaseMessagingCtrl
 * @description
 * # FirebaseMessagingCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('FirebaseMessagingCtrl', function (FirebaseMessaging, NotificationService, $scope) {
    var self = this;

    self.notification = {
    	title: "default",
    	body: "default",
    	click_action: "www.google.com"
    };

    self.data = {
    	custom1: "default",
    	custom2: new Date(),
    	custom3: 0
    }

    self.sendNotification = function() {
    	FirebaseMessaging.sendNotification(self.notification, self.subscribedTopicName);
    }

    self.sendData = function() {
    	FirebaseMessaging.sendData(self.data, self.subscribedTopicName);
    }

    self.subscribe = function() {
    	
		self.subscribed = true;

    	FirebaseMessaging.subscribe(function(messaging) {

    		//dopo che mi sono iscritto con un token creo un topic al quale mi iscrivo con quel token
    		FirebaseMessaging.createTopic(self.subscribedTopicName, function() {
    			NotificationService.notify({title: "Registrato per ricevere push al topic " + self.subscribedTopicName});
    		});

    		// quando ricevo messaggi
    		messaging.onMessage(function(payload) {
				self.newData = payload;
				$scope.$apply();
			});
    	});
    }

  });
