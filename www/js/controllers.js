angular.module('starter.controllers', [])
.controller('ListCtrl', function ($rootScope, $scope, $http) {
  $rootScope.list = [];

  $scope.loading = false;
  $scope.page = 1;
  $scope.totalPages = 100;
  $scope.predicate = '-last';

  $scope.loadMore = function () {
    if (!$scope.loading && $scope.page <= $scope.totalPages) {
      $scope.loading = true;
      $http.get('http://120.132.54.6:8888/api/sadne?page=' + $scope.page).then(function (res) {
        if (res && res.data) {
          var posts = res.data.posts;
          for (var i = 0; i < posts.length; i++) {
            $rootScope.list.push(posts[i]);
          }
        }
        setTimeout(function () {
          $scope.loading = false;
          $scope.page++;
          $scope.totalPages = res.data.totalPages;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 200);
      }, function (err) {
        console.error('error', err);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
})
.controller('DetailCtrl', function ($stateParams, $rootScope, $scope, $sce) {
  var posts = $rootScope.list;
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    if (post._id === $stateParams.id) {
      $scope.detail = post;
      $scope.currentUrl = $sce.trustAsResourceUrl(post.url);
      console.log(post);
    }
  }
});
