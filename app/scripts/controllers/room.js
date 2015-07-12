'use strict';

angular.module('blocChatApp')
 .controller('RoomCtrl', function ($scope, Room, Firebase, $modal) {
      $scope.rooms = Room.all;

      $scope.open = function() {
          var modalInstance = $modal.open({
            templateUrl: 'roomDialog.html',
            size: 'sm',
            controller: 'ModalCtrl',
          });
        };

      
  })

 .controller('ModalCtrl', function($scope, Room, $modalInstance, Firebase){
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
 });

