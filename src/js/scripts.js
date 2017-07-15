angular.module('gpa', ['rzModule', 'angularMoment'])
  .run(['amMoment', function(amMoment) {
    amMoment.changeLocale('en');
  }])
  .directive('progressDate', ['moment', function(moment) {
    return {
      scope: {
        currentRate: '=',
        hours: '@',
        format: '@'
      },
      controller: ['$scope', 'moment', function($scope, moment) {
        format = $scope.format || 'MMMM YYYY';

        $scope.getDate = function() {
          $scope.weeks = Math.round($scope.hours / $scope.currentRate);
          return moment().add($scope.weeks, 'weeks').format(format);
        };
      }],
      template: '{{ getDate() }}'
    };
  }])
  .directive('progressFuzzy', ['moment', function(moment) {
    return {
      scope: {
        currentRate: '=',
        hours: '@',
        format: '@'
      },
      controller: ['$scope', 'moment', function($scope, moment) {
        format = $scope.format || 'MMMM YYYY';

        $scope.getDate = function() {
          $scope.weeks = Math.round($scope.hours / $scope.currentRate);
          return moment().add($scope.weeks, 'weeks').format(format);
        };
      }],
      template: '<span am-time-ago="getDate()"></span>'
    };
  }])
  .controller('CalculatorController', ['$scope', '$interval', function($scope, $interval) {
    $scope.currentRate = 10;
    $scope.slider = {
      min: 1,
      max: 30,
      options: {
        ceil: 30,
        floor: 1,
        hideLimitLabels: true,
        showSelectionBar: true,
        step: 1,
        showTicks: false,
        getSelectionBarColor: function() {
          return '#FFFFFF';
        },
        getTickColor: function() {
          return '#FFFFFF';
        },
        getPointerColor: function() {
          return 'rgba(255, 255, 255, 0.5)';
        }
      }
    };

    // Start animating the number on initail page load
    $interval(function() {
      $scope.currentRate ++;
    }, 100, 5);

    $scope.$broadcast('reCalcViewDimensions');
  }]);

document.addEventListener("DOMContentLoaded", function() {
  var sweetScroll = new SweetScroll();
}, false);
