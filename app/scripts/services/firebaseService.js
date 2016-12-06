angular.module('testApp').factory("FirebaseService", ["$firebaseArray", "$firebaseObject",
  function($firebaseArray, $firebaseObject) {
   
    var self = this;
    var BASE_URL = "https://test-marco-p.firebaseio.com/testMosse/";
    
    self.database = $firebaseObject(new Firebase(BASE_URL));
 
    self.creaServer = function(serverName) {
        var serverId = serverName + "_" + new Date().getTime() +  "_" + Math.round(Math.random() * 100000000);
        console.log("generato ID server = " + serverId);
        
        self.connessione(serverId);
    }

    self.eliminaServer = function(serverName) {
        $firebaseObject(new Firebase(BASE_URL + serverName)).$remove();
    }

    self.connessione = function(serverId, nomeUtente) {
        if(self.utente) {
            self.utente.$remove();
        }
        self.utente = $firebaseObject(new Firebase(BASE_URL + serverId + "/utenti/" + nomeUtente));
        self.utenti = $firebaseObject(new Firebase(BASE_URL + serverId + "/utenti"));
        self.chat = $firebaseArray(new Firebase(BASE_URL + serverId + "/chat"));
        self.serverId = serverId;
    }

    self.inviaPosizione = function(x, y) {
        self.utente.x = x;
        self.utente.y = y;
        self.utente.$save();
    }

    self.inviaMessaggio = function(nomeUtente, mossa) {
        self.chat.$add({
            from: nomeUtente,
            timestamp: new Date().getTime(),
            content: mossa
        });
    };
    
    return self;
  }
]);