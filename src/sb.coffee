angular
.module 'ngSb', ['sbTemplate']
.constant 'sbDefaults',
  bufferSize: 10
.directive 'sb', ['$log', 'sbDefaults', ($log, sbDefaults) ->
  restrict: 'E'
  templatUrl: 'sbTemplate.html'
  scope:
    mode: '='
  compile: (ele, attr) ->
    pre: (scope, ele, attr) ->
    post: (scope, ele, attr) ->
]