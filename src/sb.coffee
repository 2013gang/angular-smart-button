angular
.module 'ngSb', ['sbTemplate']
.constant 'sbDefaults',
  bufferSize: 10
  defaultWait: 400
  waitingText: 'Waiting...'
  mode:
    debounce: 'DE'
    wait: 'WA'
    queue: 'QU'
.directive 'sb', ['$log', '$q', '$timeout', 'sbDefaults', ($log, $q, $timeout, sbDefaults) ->
  restrict: 'E'
  templateUrl: 'sbTemplate.html'
  scope:
    mode: '@'
    action: '&'
    text: '='
    queue: '=?'
  compile: (ele, attr) ->
    timeout = null
    pre: (scope, ele, attr) ->
      if scope.mode is sbDefaults.mode.debounce
        ele.bind 'click', (ev) ->
          $log.log 'on click debounce mode'
          clearTimeout timeout
          timeout = setTimeout scope.action(), sbDefaults.defaultWait
          do ev.preventDefault
      else if scope.mode is sbDefaults.mode.wait
        ele.bind 'click', (ev) ->
          $log.log 'on click wait mode'
          waitFor = do(do scope.action)
          ele.children().prop 'disabled', true
          scope.text = sbDefaults.waitingText
          do scope.$apply
          $q.when(waitFor)
          .then () ->
            ele.children().prop 'disabled', false
            scope.text = 'Finished!'
            $timeout(
              ->
                scope.text = 'promise'
              , 1000)
          ,
          () ->
            $log.error 'Failed to resolve the promise'
          do ev.preventDefault
      else if scope.mode is sbDefaults.mode.queue
        scope.queue = {}
        ele.bind 'click', (ev) ->
          $log.log 'on click queue mode'
          waitFor = do(do scope.action)
          timestamp = new Date().getTime()
          scope.queue[timestamp] = waitFor
          do scope.$apply
          $q.when(waitFor)
          .then () ->
            delete scope.queue[timestamp]
            $log.log 'Finished one promise @ ' + timestamp
          ,
          () ->
            $log.error 'Failed to resolve the promise @ ' + timestamp
          do ev.preventDefault
    post: (scope, ele, attr) ->
]