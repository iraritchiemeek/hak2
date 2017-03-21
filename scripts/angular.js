var hakApp = angular.module('hakApp', ['ngRoute']);

hakApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: "../pages/home.html",
    })
    .when('/music', {
        templateUrl : "../pages/music.html",
    })
    .when('/photos', {
        templateUrl : "../pages/photos.html"
    })
    .when('/videos', {
        templateUrl : "../pages/videos.html"
    })
    .when('/about', {
        templateUrl : "../pages/about.html"
    })
    .otherwise({
        redirectTo: '/'
    });
});

hakApp.controller('mainController', function($scope, $location, $sce) {
    $scope.video_ids = ['VN4oEB-qtrM', 'b_jx0XvpTVo']
    $scope.gallery = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']  
    $scope.tracks = ['Aura', 'Look Forward To', 'She Say', 'Hues', 'No Days Off', 'Ambrosia', 'Solitude', 'Coral', 'Pollen', 'Lenox', 'Concrete Waves', 'Bedroom Record', '432 Hz', 'Order In Nature', 'June']
    $scope.index = 0
    $scope.playing_track = false
    $scope.current_track

    $scope.go = function (path) {
      $location.path(path);
    };

    $scope.decrementIndex = function(array) {
        if ($scope.index <= 0) {
            $scope.index = array.length -1
        } else {
            $scope.index -= 1
        }
    }

    $scope.incrementIndex = function(array) {
        if ($scope.index >= array.length -1) {
            $scope.index = 0
        } else {
            $scope.index += 1
        }
    }

    $scope.selectVideoButton = function (video) {
        if (video == 'aura') {
            $($('.videos__button')[1]).css({opacity: 0.6})
            $($('.videos__button')[0]).css({opacity: 1})
            $scope.current_video_url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/VN4oEB-qtrM')
        } else if (video == 'solitude') {     
            $($('.videos__button')[0]).css({opacity: 0.6})
            $($('.videos__button')[1]).css({opacity: 1})
            $scope.current_video_url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/b_jx0XvpTVo')
        }
    }

    $scope.displayPlayIcon = function (index) {
        $($('.music__track-number')[index]).addClass('music__track-number--play')
    }

    $scope.displayPauseIcon = function (index) {
        $($('.music__track-number')[index]).addClass('music__track-number--pause')
    }

    $scope.clearIcons = function() {
        for (var i = $('.music__track-number').length - 1; i >= 0; i--) {
            if ($($('.music__track-number')[i]).attr('id') !== $scope.current_track_index) {                
                $('.music__track-number').removeClass('music__track-number--pause')
                $('.music__track-number').removeClass('music__track-number--play')
            }
        }
    }

    // $scope.setTrack = function ($event) {
    //     // get track number
    //     // use array of track names to set audio object
    //     // check if track is already loaded
    // }

    $scope.audioHandler = function(index) {
        if (!$scope.current_track) {
            $scope.setTrack(index)
            $scope.togglePlaying(index)
            $scope.displayPauseIcon(index)
        } else if ($($('.music__track-number')[index]).attr('id') == $scope.current_track_index) {
            $scope.displayPauseIcon(index)
            $scope.togglePlaying(index)
        } else {
            $scope.clearIcons()
            $scope.current_track_index == index
            $($scope.current_track).attr('src', '../public/album/' + $scope.tracks[index] + '.mp3')
            $($scope.current_track)[0].load()
            $($scope.current_track)[0].pause()
            $scope.current_track.oncanplaythrough = $scope.togglePlaying(index)
        }
    }

    $scope.setTrack = function(index) {
        $scope.displayPlayIcon(index)
        $scope.current_track = new Audio('../public/album/' + $scope.tracks[index] + '.mp3')     
        // $($scope.current_track).attr('id', index)
    }

    $scope.togglePlaying = function (index) {
        if ($scope.playing_track) {
            $scope.playing_track = false
            $scope.current_track.pause();
            $scope.displayPlayIcon(index)
        } else {
            $scope.playing_track = true
            $scope.current_track.play();
            $scope.displayPauseIcon(index)
        }
    }

});

