'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function (FirebaseService) {
    var self = this;

    self.database = FirebaseService.database;
    self.listaServer = self.database;
    self.nomeUtente = localStorage.testFireBaseMosse_nomeUtente;

    self.creaUtente = function(nomeUtente) {
      localStorage.testFireBaseMosse_nomeUtente = nomeUtente;
      self.nomeUtente = nomeUtente;
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
      FirebaseService.connessione(serverId, self.nomeUtente);
      console.log("connesso a " + serverId + " : " + self.nomeUtente);
      self.serverId = FirebaseService.serverId;
      self.utenti = FirebaseService.utenti;
      self.chat = FirebaseService.chat;
    }

    self.inviaMessaggio = function() {
    	FirebaseService.inviaMessaggio(self.nomeUtente, self.messaggio);
      self.messaggio = "";
    };

    self.inviaPosizione = function(e) {
      FirebaseService.inviaPosizione(e.offsetX, e.offsetY);
    }

  });
 