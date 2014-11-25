(function() {
    
    var API_KEY = 'dc6zaTOxFJmzC',
        API = 'http://api.giphy.com/v1/gifs/random';
    
    document.addEventListener('deviceready', function() {
        navigator.splashscreen.hide();
    });
    
    var app = angular.module('app', ['kendo.directives']); 

    app.factory('GIFService', ['$http', function($http) {
        getRandom = function() {
            return $http.get(API + '?tag=pug&api_key=' + API_KEY);
        }
        return {
            getRandom: getRandom
        };
    }]);
    
    app.controller('GIFController', ['GIFService', '$rootScope', function(GIFService, $rootScope) {
      
        var that = this,
            app = $rootScope.mobileApp;
        
        this.current = null;
        
        // returns a random GIF url from the Giphy API
        this.getRandom = function() {
            app.showLoading();
            GIFService.getRandom().success(function(response) {
               that.current = response.data.image_url;
            });
        };
        
        this.shareGif = function() {
            window.plugins.socialsharing.share(null, null, null, this.current);
        };
        
        // fired when the GIF has loaded in the app and can be seen
        this.loaded = function() {
            app.hideLoading();
        };
        
        // gets the initial GIF to display when the app is loaded
        this.getRandom();
    }]);

    // fire the loaded event on images
    app.directive('load', function () {       
        return {
            link: function($scope, element, attrs) {   
                if (attrs.load) {
                    element.bind("load" , function(e){  
                        $scope.$apply(attrs.load);                
                    });
                }
            }
        }
    });
    
}());