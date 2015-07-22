'use strict';

/**
 * @ngdoc overview
 * @name blocChatApp
 * @description
 * # blocChatApp
 *
 * Main module of the application.
 */
angular
  .module('blocChatApp', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies'])

  .constant('FIREBASE_URL', 'https://jennifer.firebaseio.com')

  .factory('Room', function(Firebase, $firebaseArray, FIREBASE_URL) {
    var roomRef = new Firebase(FIREBASE_URL).child('rooms');
    var msgRef = new Firebase(FIREBASE_URL).child('messages');
    var rooms = $firebaseArray(roomRef);

    return  {
        all: rooms,
        create: function(room){
            return rooms.$add(room);
        },
        messages: function(roomId){
            var query = msgRef.orderByChild('roomId').equalTo(roomId);
            return $firebaseArray(query);
        }
    };
   })

  .factory('Message', function($firebase, $firebaseArray, $firebaseObject, FIREBASE_URL, Firebase){
      var ref = new Firebase(FIREBASE_URL).child('messages');

      var messages = $firebaseArray(ref);
      return {
        send: function(newMsg){
          return messages.$add(newMsg);
        }
      };
    })

  .filter('fromNow', function() {
    return function(dateString) {
      return moment(dateString).fromNow();
    };
  })

  .run(function($cookies, $modal) {
    if (!$cookies.blocChatUser || $cookies.blocChatUser === '' ) {
      // Do something to allow users to set their username
      var modalInstance = $modal.open({
        templateUrl: 'userDialog.html',
        controller: 'UserModalCtrl',
        keyboard: false,
        backdrop: 'static',
        size: 'sm'
      });
    }
  })

 .controller('RoomCtrl', function ($scope, Room, Message, Firebase, $modal, $cookies) {
      $scope.rooms = Room.all;
      $scope.room = {name: ''};
      $scope.blocChatUser = $cookies.blocChatUser;

      $scope.roomOpen = function() {
          var modalInstance = $modal.open({
            templateUrl: 'roomDialog.html',
            size: 'sm',
            controller: 'RoomModalCtrl',
          });
        };

      $scope.openMessages = function(room){
        $scope.messages = Room.messages(room.$id);
        $scope.roomid = room.$id;
      };

      $scope.sendMsg = function(room){
        var timestamp = Firebase.ServerValue.TIMESTAMP;
        var msg = {
          username: $cookies.blocChatUser,
          content: $scope.msgcontent,
          sentAt: timestamp,
          roomId: room,
        };
        Message.send(msg);
        $scope.msgcontent = '';
      };

      $scope.hitEnter = function(evt, room){
        if(angular.equals(evt.keyCode,13) ){
          $scope.sendMsg(room);
        }
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

    $scope.ok = function(username) {
      $cookies.blocChatUser = username;
      $modalInstance.close();
    };
    

    $scope.hitEnter = function(evt){
      if(angular.equals(evt.keyCode,13) ){
        $scope.ok($scope.username);
      }
    };
 });

