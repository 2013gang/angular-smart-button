angular
.module 'ngSb', ['sbTemplate']
.constant 'sbDefaults',
  bufferSize: 10
  defaultWait: 2000
.directive 'sb', ['$log', 'sbDefaults', ($log, sbDefaults) ->
  restrict: 'E'
  templateUrl: 'sbTemplate.html'
  scope:
    mode: '='
    action: '&'
  compile: (ele, attr) ->
    timeout = null
    pre: (scope, ele, attr) ->
      ele.on 'click', (ev) ->
        console.log 'on click'
        clearTimeout timeout
        timeout = setTimeout scope.action(), sbDefaults.defaultWait
        do ev.preventDefault
    post: (scope, ele, attr) ->
]