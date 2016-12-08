'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:FirebaseStorageCtrl
 * @description
 * # FirebaseStorageCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('FirebaseStorageCtrl', function () {
    var self = this;

    self.fileList = [{title:"test1"},{title:"test2"}]
  });
