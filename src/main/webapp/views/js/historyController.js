/**
 * Created by Dell on 17/4/2558.
 */
'use strict';
var historyMainController = angular.module('historyMainController', ['historyServices']);

historyMainController.controller('addHistoryController', ['$scope', '$http', '$location', '$rootScope','historyService',
    function ($scope, $http, $location, $rootScope,historyService) {
        $scope.history = {};
        $scope.addHistory = true;
        $scope.editHistory = false;
        $scope.addHistory = function (flowFiles) {
            historyService.save($scope.history,function(data){
                // after adding the object, add a new picture
                // get the product id which the image will be added
                var historyid = data.id;
                // set location
                flowFiles.opts.target = '/historyImage/add';
                flowFiles.opts.testChunks = false;
                flowFiles.opts.query ={historyid:historyid};
                flowFiles.upload();
                $rootScope.addSuccess = true;
                $location.path("listHistory");
                $scope.$apply();
            });
        };
    }]);

historyMainController.controller('editHistoryController', ['$scope', '$http', '$routeParams', '$location', '$rootScope','historyService',
    function ($scope, $http, $routeParams, $location, $rootScope,historyService) {
        $scope.addHistory = false;
        $scope.editHistory = true;
        var id = $routeParams.id;
        $http.get("/history/" + id).success(function (data) {
            $scope.history = data;
        });

        $scope.editHistory = function () {
            historyService.update({id:$scope.history.id},$scope.history,function(){
                $rootScope.editSuccess = true;
                $location.path("listHistory");
            });
        }
    }]);

historyMainController.controller('listHistoryController', ['$scope', '$http', '$rootScope','historyService', '$location',
    function ($scope, $http, $rootScope,historyService, $location) {
        var data = historyService.query( function(){
            $scope.histories = data;
            $location.path("listHistory");
        });

    }]);