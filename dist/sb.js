(function() {
  angular.module('ngSb', ['sbTemplate']).constant('sbDefaults', {
    bufferSize: 10,
    defaultWait: 2000
  }).directive('sb', [
    '$log', 'sbDefaults', function($log, sbDefaults) {
      return {
        restrict: 'E',
        templateUrl: 'sbTemplate.html',
        scope: {
          mode: '=',
          action: '&'
        },
        compile: function(ele, attr) {
          var timeout;
          timeout = null;
          return {
            pre: function(scope, ele, attr) {
              return ele.on('click', function(ev) {
                console.log('on click');
                clearTimeout(timeout);
                timeout = setTimeout(scope.action(), sbDefaults.defaultWait);
                return ev.preventDefault();
              });
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
    '<button>I am a smart button</button>');
}]);
})();
