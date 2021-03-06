'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (func) {

    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };
})();
