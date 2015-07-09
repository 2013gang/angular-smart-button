(function() {
  angular.module('ngSb', ['sbTemplate']).constant('sbDefaults', {
    bufferSize: 10,
    defaultWait: 400,
    waitingText: 'Waiting...',
    mode: {
      debounce: 'DE',
      wait: 'WA',
      queue: 'QU'
    }
  }).directive('sb', [
    '$log', '$q', '$timeout', 'sbDefaults', function($log, $q, $timeout, sbDefaults) {
      return {
        restrict: 'E',
        templateUrl: 'sbTemplate.html',
        scope: {
          mode: '@',
          action: '&',
          text: '=',
          queue: '=?'
        },
        compile: function(ele, attr) {
          var timeout;
          timeout = null;
          return {
            pre: function(scope, ele, attr) {
              if (scope.mode === sbDefaults.mode.debounce) {
                return ele.bind('click', function(ev) {
                  $log.log('on click debounce mode');
                  clearTimeout(timeout);
                  timeout = setTimeout(scope.action(), sbDefaults.defaultWait);
                  return ev.preventDefault();
                });
              } else if (scope.mode === sbDefaults.mode.wait) {
                return ele.bind('click', function(ev) {
                  var waitFor;
                  $log.log('on click wait mode');
                  waitFor = (scope.action())();
                  ele.children().prop('disabled', true);
                  scope.text = sbDefaults.waitingText;
                  scope.$apply();
                  $q.when(waitFor).then(function() {
                    ele.children().prop('disabled', false);
                    scope.text = 'Finished!';
                    return $timeout(function() {
                      return scope.text = 'promise';
                    }, 1000);
                  }, function() {
                    return $log.error('Failed to resolve the promise');
                  });
                  return ev.preventDefault();
                });
              } else if (scope.mode === sbDefaults.mode.queue) {
                scope.queue = {};
                return ele.bind('click', function(ev) {
                  var timestamp, waitFor;
                  $log.log('on click queue mode');
                  waitFor = (scope.action())();
                  timestamp = new Date().getTime();
                  scope.queue[timestamp] = waitFor;
                  scope.$apply();
                  $q.when(waitFor).then(function() {
                    delete scope.queue[timestamp];
                    return $log.log('Finished one promise @ ' + timestamp);
                  }, function() {
                    return $log.error('Failed to resolve the promise @ ' + timestamp);
                  });
                  return ev.preventDefault();
                });
              }
            },
            post: function(scope, ele, attr) {}
          };
        }
      };
    }
  ]);

}).call(this);

(function(module) {
try {
  module = angular.module('sbTemplate');
} catch (e) {
  module = angular.module('sbTemplate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('sbTemplate.html',
    '<button class="smart-button" ng-class="mode">{{text}}</button>');
}]);
})();
