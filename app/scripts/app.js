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
  .module('blocChatApp', [
    'ngAnimate', 'ui.router', 'firebase', 'ui.bootstrap'])

  .constant('FIREBASE_URL', 'https://jennifer.firebaseio.com')

  .controller('RoomCtrl', function ($scope, Room, Firebase) {
      $scope.rooms = Room.all;

      $scope.submitRoom = function(room) {
          var timestamp = Firebase.ServerValue.TIMESTAMP;
          room.created = timestamp;
          Room.create(room).then(function(){
            $scope.room = {};
          });
      };
  })

  .factory('Room', function(Firebase, $firebaseArray, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + '/rooms');
    var rooms = $firebaseArray(ref);

    return  {
        all: rooms,
        create: function(room){
            return rooms.$add(room);
        },
    };
   });
