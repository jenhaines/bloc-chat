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

  .filter('fromNow', function() {
    return function(dateString) {
      return moment(dateString).fromNow();
    };
  })

  .run(['$cookies', function($cookies) {

    if (!$cookies.blocChatCurrentUser || $cookies.blocChatCurrentUser === '' ) {
        // Do something to allow users to set their username
    }

  }])