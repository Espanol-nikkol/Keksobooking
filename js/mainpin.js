'use strict';
(function () {
  var startCoord = {};
  var mainPin = window.util.variable.mainPin;
  var consts = window.util.const;
  var map = document.querySelector('.map');
  window.flagOfActivation = 1;
  var newPosition = '';
  window.fields = Array.from(document.querySelectorAll('fieldset'))
      .concat(Array.from(document.querySelectorAll('select')));

  var createBorderLeft = function () {
    if (mainPin.offsetLeft <= (consts.BorderMap.LEFT - 16)) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      newPosition = parseFloat(mainPin.style.left) + 5;
      newPosition = newPosition + 'px';
      mainPin.style.left = newPosition;
    }
  };

  var createBorderRight = function () {
    if (mainPin.offsetLeft >= (consts.BorderMap.RIGHT - 30)) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      newPosition = parseFloat(mainPin.style.left) - 5;
      newPosition = newPosition + 'px';
      mainPin.style.left = newPosition;
    }
  };

  var createBorderTop = function () {
    if (mainPin.offsetTop <= (consts.BorderMap.TOP - 70)) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      newPosition = parseFloat(mainPin.style.top) + 5;
      newPosition = newPosition + 'px';
      mainPin.style.top = newPosition;
    }
  };

  var createBorderBottom = function () {
    if (mainPin.offsetTop >= consts.BorderMap.BOTTOM + 30) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      newPosition = parseFloat(mainPin.style.top) - 5;
      newPosition = newPosition + 'px';
      mainPin.style.top = newPosition;
    }
  };

  var createBorders = function () {
    createBorderLeft();
    createBorderTop();
    createBorderRight();
    createBorderBottom();
  };

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

    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

    window.util.getAddress();
    createBorders();
  };

  var onMainPinMouseUp = function (evtUp) {
    evtUp.preventDefault();
    map.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var turnOnFields = function () {
    window.fields.forEach(function (elem) {
        elem.disabled = false
    });
  };

  var activatedMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', false);
    turnOnFields();
    window.renderPins(window.card);
    window.util.getAddress();
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (window.card.length > 0) {
      onMainPinMouseDown(evt);
      if (window.flagOfActivation === 1) {
        activatedMap();
        window.flagOfActivation = window.flagOfActivation + 1;
      }
      map.addEventListener('mousemove', onMainPinMouseMove);
      document.addEventListener('mouseup', onMainPinMouseUp);
    }
  }
  );

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activatedMap);
  }
  );
})();
