'use strict';
(function () {
  var startCoord = {};
  var mainPin = window.util.variable.mainPin;
  var consts = window.util.const;
  var map = document.querySelector('.map');
  var flagOfActivation = 0;

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };
  };

  var onMainPinMouseMove = function (evtMove) {
    evtMove.preventDefault();

    var shift = {
      x: (startCoord.x - evtMove.clientX),
      y: (startCoord.y - evtMove.clientY)
    };

    startCoord = {
      x: evtMove.clientX,
      y: evtMove.clientY
    };

    var createBordersVertical = function (side) {
      switch (side) {
        case top: 
          if (mainPin.offsetTop <= (consts.BorderMap.TOP - consts.PaddingMap.TOP)) {
            map.removeEventListener('mousemove', onMainPinMouseMove);
            var newPosition = parseFloat(mainPin.style.top) + 5;
            newPosition = newPosition + 'px';
            mainPin.style.top = newPosition;
          }
          break;
      }
      
    }

    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    window.util.getAddress();
    if (mainPin.offsetTop <= (consts.BORDER_MAP_TOP - 70)) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      var newPosition = parseFloat(mainPin.style.top) + 5;
      newPosition = newPosition + 'px';
      mainPin.style.top = newPosition;
    }
    if (mainPin.offsetTop >= consts.BORDER_MAP_BOTTOM + 30) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      newPosition = parseFloat(mainPin.style.top) - 5;
      newPosition = newPosition + 'px';
      mainPin.style.top = newPosition;
    }
    if (mainPin.offsetLeft <= (consts.BORDER_MAP_LEFT - 16)) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      newPosition = parseFloat(mainPin.style.left) + 5;
      newPosition = newPosition + 'px';
      mainPin.style.left = newPosition;
    }
    if (mainPin.offsetLeft >= (consts.BORDER_MAP_RIGHT - 30)) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      newPosition = parseFloat(mainPin.style.left) - 5;
      newPosition = newPosition + 'px';
      mainPin.style.left = newPosition;
    }
  };

  var onMainPinMouseUp = function (evtUp) {
    evtUp.preventDefault();
    map.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };


  var activatedMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', false);
    var fields = document.querySelectorAll('fieldset');
    fields.forEach(function (elem) {
      elem.disabled = false;
    }) 
    window.renderPins(window.card);
    window.util.getAddress();
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  mainPin.addEventListener('mousedown', function (evt) {
    onMainPinMouseDown(evt);
    flagOfActivation = flagOfActivation + 1;
    if (flagOfActivation === 1) {
      activatedMap();
    }
    map.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });
  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activatedMap);
  }
  );
})();
