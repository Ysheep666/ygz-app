angular.module('starter', ['ionic', 'starter.controllers'])
.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('list', {
      url: '/list',
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl'
    })
    .state('list-detail', {
      url: '/detail/:id',
      templateUrl: 'templates/detail.html',
      controller: 'DetailCtrl'
    });

  $urlRouterProvider.otherwise('/list');
});
