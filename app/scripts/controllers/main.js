'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function (FirebaseService, $rootScope) {
    var self = this;

    self.database = FirebaseService.database;
    self.listaServer = self.database;
    self.nomeUtente = $rootScope.loggedUser ? $rootScope.loggedUser.displayName : undefined;

    self.login = function(nomeUtente) {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        console.log("access token = " + token)
        $rootScope.loggedUser = result.user;
        $rootScope.$apply();
      }).catch(function(error) {
        console.error(JSON.stringify(error))
      });
    }

    self.logout = function() {
      firebase.auth().signOut().then(function() {
        $rootScope.loggedUser = undefined;
        $rootScope.$apply();
      }, function(error) {
        // An error happened.
      });
    }

    self.creaServer = function(nomeServer) {
      FirebaseService.creaServer(nomeServer);
      self.serverId = FirebaseService.serverId;
      self.utenti = FirebaseService.utenti;
      self.chat = FirebaseService.chat;
    }

    self.eliminaServer = function(nomeServer) {
      FirebaseService.eliminaServer(nomeServer);
    }

    self.connettiti = function(serverId) {
      FirebaseService.connessione(serverId, $rootScope.loggedUser.displayName);
      console.log("connesso a " + serverId + " : " + $rootScope.loggedUser.displayName);
      self.serverId = FirebaseService.serverId;
      self.utenti = FirebaseService.utenti;
      self.chat = FirebaseService.chat;
    }

    self.inviaMessaggio = function() {
    	FirebaseService.inviaMessaggio($rootScope.loggedUser.displayName, self.messaggio);
      self.messaggio = "";
    };

    self.inviaPosizione = function(e) {
      FirebaseService.inviaPosizione(e.offsetX, e.offsetY);
    }

  });
 