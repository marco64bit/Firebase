'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('FirebaseDbAndAuthenticationCtrl', function (FirebaseService, NotificationService, $rootScope) {
    var self = this;

    self.database = FirebaseService.database;
    self.listaServer = self.database;
    self.utentiConnessi = FirebaseService.utentiConnessi;
    self.nomeUtente = $rootScope.loggedUser ? $rootScope.loggedUser.displayName : undefined;

    self.login = function(nomeProvider) {
      FirebaseService.login(nomeProvider);
    }

    self.logout = function() {
      FirebaseService.logout();
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
      self.utenti.$watch(function(utenti) {
          controlloUtentiConnessi(utenti);
      });
    }

    self.inviaMessaggio = function() {
    	FirebaseService.inviaMessaggio($rootScope.loggedUser.displayName, self.messaggio);
      self.messaggio = "";
    };

    self.inviaPosizione = function(e) {
      FirebaseService.inviaPosizione(e.offsetX, e.offsetY);
    }

    var controlloUtentiConnessi = function(utenti) { 
      var i = 0;
      angular.forEach(self.utenti, function() {
        i ++;
      })

      if(self.count) {
        if(self.count < i) {
          NotificationService.notify({"title": "Un utente si è connesso a  " + self.serverId});
        }else if(self.count > i) {
          NotificationService.notify({"title": "Un utente si è disconnesso da " + self.serverId});
        }
        
      } 
      self.count = i;
    }

    window.onbeforeunload = function() {
      console.info("stai chiudendo questa pagina")
      FirebaseService.disconnetti();
    }

  });
 