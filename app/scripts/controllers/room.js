'use strict';

angular.module('blocChatApp')
 .controller('RoomCtrl', function ($scope,Room, Firebase, $modal, $cookies) {
      $scope.rooms = Room.all;
      $scope.room = {name: ''};

      $scope.roomOpen = function() {
          var modalInstance = $modal.open({
            templateUrl: 'roomDialog.html',
            size: 'sm',
            controller: 'RoomModalCtrl',
          });
        };

      $scope.openMessages = function(room){
        $scope.messages = Room.messages(room.$id);
      };

      
  })

 .controller('RoomModalCtrl', function($scope, Room, $modalInstance, Firebase){
    $scope.room = {name: ''};

    $scope.ok = function(room) {
      var timestamp = Firebase.ServerValue.TIMESTAMP;
      room.created = timestamp;
      Room.create(room);
      $modalInstance.close();
    };
    

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.hitEnter = function(evt){
      if(angular.equals(evt.keyCode,13) ){
        $scope.ok($scope.room);
      }
    };
 })

 .controller('UserModalCtrl', function($scope, $modalInstance, $cookies){

    $scope.ok = function(user) {
      $cookies.blocChatUser = user.name;
      $scope.blocChatUser = $cookies.blocChatUser;
      $modalInstance.close($scope.blocChatUser);
    };
    

    $scope.hitEnter = function(evt){
      if(angular.equals(evt.keyCode,13) ){
        $scope.ok($scope.user);
      }
    };
 });

