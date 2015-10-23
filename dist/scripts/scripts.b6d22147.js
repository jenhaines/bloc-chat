"use strict";var WebFontConfig={google:{families:["Architects+Daughter::latin"]}};!function(){var a=document.createElement("script");a.src=("https:"==document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js",a.type="text/javascript",a.async="true";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}(),angular.module("simpleChatApp",["firebase","ui.bootstrap","ngCookies"]).constant("FIREBASE_URL","https://jennifer.firebaseio.com").factory("Room",["$firebaseArray","FIREBASE_URL",function(a,b){var c=new Firebase(b).child("rooms"),d=new Firebase(b).child("messages"),e=a(c);return{all:e,create:function(a){return e.$add(a)},messages:function(b){var c=d.orderByChild("roomId").equalTo(b);return a(c)}}}]).factory("Message",["$firebase","$firebaseArray","FIREBASE_URL",function(a,b,c){var d=new Firebase(c).child("messages"),e=b(d);return{send:function(a){return e.$add(a)}}}]).filter("fromNow",function(){return function(a){return moment(a).fromNow()}}).run(["$cookies","$modal",function(a,b){if(!a.get("simpleChatUser")||""===a.get("simpleChatUser")){b.open({templateUrl:"userDialog.html",controller:"UserModalCtrl",keyboard:!1,backdrop:"static",size:"sm"})}}]).controller("RoomCtrl",["$scope","Room","Message","$modal","$cookies",function(a,b,c,d,e){a.rooms=b.all,a.room={name:""},a.simpleChatUser=e.get("simpleChatUser"),a.roomOpen=function(){d.open({templateUrl:"roomDialog.html",size:"sm",controller:"RoomModalCtrl"})},a.openMessages=function(c){a.messages=b.messages(c.$id),a.selectedRoom=c.$id},a.sendMsg=function(b){console.log(b);var d=Firebase.ServerValue.TIMESTAMP,f={username:e.get("simpleChatUser"),content:a.msgcontent,sentAt:d,roomId:b};c.send(f),a.msgcontent=""},a.hitEnter=function(b,c){angular.equals(b.keyCode,13)&&a.sendMsg(c)},a.clickOnUpload=function(){$timeout(function(){angular.element("#0").triggerHandler("click")},100)}}]).controller("RoomModalCtrl",["$scope","Room","$modalInstance",function(a,b,c){a.room={name:""},a.ok=function(a){var d=Firebase.ServerValue.TIMESTAMP;a.created=d,b.create(a),c.close()},a.cancel=function(){c.dismiss("cancel")},a.hitEnter=function(b){angular.equals(b.keyCode,13)&&a.ok(a.room)}}]).controller("UserModalCtrl",["$scope","$modalInstance","$cookies",function(a,b,c){a.ok=function(a){c.put("simpleChatUser",a),b.close()},a.hitEnter=function(b){angular.equals(b.keyCode,13)&&a.ok(a.username)}}]);