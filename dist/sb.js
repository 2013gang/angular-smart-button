(function() {
  angular.module('ngSb', ['sbTemplate']).constant('sbDefaults', {
    bufferSize: 10
  }).directive('sb', [
    '$log', 'sbDefaults', function($log, sbDefaults) {
      return {
        restrict: 'E',
        templatUrl: 'sbTemplate.html',
        scope: {
          mode: '='
        },
        compile: function(ele, attr) {
          return {
            pre: function(scope, ele, attr) {},
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
