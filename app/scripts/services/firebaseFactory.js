angular.module('testApp').factory("FirebaseFactory", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database location where we will store our data
    var randomRoomId;

    if(localStorage.firebaseTest_id === undefined) {
    	randomRoomId = Math.round(Math.random() * 100000000);
    	localStorage.firebaseTest_id = randomRoomId;
    }else {
    	randomRoomId = localStorage.firebaseTest_id;
    }
    
    var ref = new Firebase("https://test-marco-p.firebaseio.com/test/" + randomRoomId);

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);