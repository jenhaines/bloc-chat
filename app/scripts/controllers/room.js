'use strict';

angular.module('blocChatApp')
 .controller('RoomCtrl', function ($scope, Room, Firebase, $modal) {
      $scope.rooms = Room.all;

      $scope.open = function() {
          var modalInstance = $modal.open({
            templateUrl: 'roomDialog.html',
          });
        };

      $scope.submitRoom = function(room) {
          var timestamp = Firebase.ServerValue.TIMESTAMP;
          room.created = timestamp;
          Room.create(room).then(function(){
            $scope.room = {};
          });
      };
  })

 .controller('ModalCtrl', function($scope, $modalInstance){
    $scope.room = {name: ''};
    
    $scope.ok = function(){
      $modalInstance.close($scope.room.name);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
 });

