angular.module('testApp').factory("FirebaseService", ["$firebaseArray", "$firebaseObject", "$rootScope",
  function($firebaseArray, $firebaseObject, $rootScope) {
   
    var self = this;
    var BASE_URL = "https://test-marco-p.firebaseio.com";
    var SERVER_URL = BASE_URL + "/testMosse/";
    self.database = $firebaseObject(new Firebase(SERVER_URL));
    self.utentiConnessi = $firebaseObject(new Firebase(BASE_URL + "/utentiConnessi"));

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $rootScope.loggedUser = user;
        } 
    });
 
    self.creaServer = function(serverName) {
        var serverId = serverName + "_" + new Date().getTime() +  "_" + Math.round(Math.random() * 100000000);
        console.log("generato ID server = " + serverId);
        
        self.connessione(serverId);
    }

    self.eliminaServer = function(serverName) {
        $firebaseObject(new Firebase(SERVER_URL + serverName)).$remove();
    }

    self.connessione = function(serverId, nomeUtente) {
        self.disconnetti();

        self.utente = $firebaseObject(new Firebase(SERVER_URL + serverId + "/utenti/" + nomeUtente));
        self.utenti = $firebaseObject(new Firebase(SERVER_URL + serverId + "/utenti"));
        self.chat = $firebaseArray(new Firebase(SERVER_URL + serverId + "/chat"));
        self.serverId = serverId;

        if(!self.utentiConnessi[self.serverId]){
            self.utentiConnessi[self.serverId] = {count : 0}
        }
        self.utentiConnessi[self.serverId].count += 1;
        self.utentiConnessi.$save();
    }

    
    self.disconnetti =  function() {
        if(self.utente) {
            self.utente.$remove();
            self.utentiConnessi[self.serverId].count -= 1;
            if(self.utentiConnessi[self.serverId].count == 0){
                delete self.utentiConnessi[self.serverId];
            }
            self.utentiConnessi.$save();
        }
    }

    self.inviaPosizione = function(x, y) {
        self.utente.x = x;
        self.utente.y = y;
        self.utente.photoURL = $rootScope.loggedUser.photoURL;
        self.utente.$save();
    }

    self.inviaMessaggio = function(nomeUtente, mossa) {
        self.chat.$add({
            from: nomeUtente,
            timestamp: new Date().getTime(),
            content: mossa
        });
    };

    self.login = function(nomeProvider) {
      var provider = {
        "Google": new firebase.auth.GoogleAuthProvider(),
        "Facebook": new firebase.auth.FacebookAuthProvider()
      }[nomeProvider];

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
        self.disconnetti();
      }, function(error) {
        // An error happened.
      });
    }
    
    return self;
  }
]);