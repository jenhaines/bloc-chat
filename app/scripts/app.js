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
  .module('blocChatApp', ['ui.router', 'firebase', 'ui.bootstrap'])

  .constant('FIREBASE_URL', 'https://jennifer.firebaseio.com')

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
