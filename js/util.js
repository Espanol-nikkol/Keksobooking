'use strict';
(function () {
  window.util = {
    const: {
      Keycode: {
        ENTER: 13,
        ESC: 27
      },
      BorderMap: {
        LEFT: 26,
        RIGHT: 1166,
        TOP: 200,
        BOTTOM: 600
      },
      PaddingMap: {
        LEFT: 16,
        RIGHT: 30,
        TOP: 70,
        BOTTOM: 30
      },
      SizeMainPin: {
        WIDTH: 62,
        HEIGHT: 70
      }
    },
    variable: {
      mainPin: document.querySelector('.map__pin--main')
    },
    houseEnToHouseRu: {
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'flat': 'Квартира',
      'palace': 'Дворец'
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === this.const.Keycode.ENTER) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === this.const.Keycode.ESC) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
      return randomNumber;
    },
    getAddress: function () {
      var SHIFT_END_MAIN_PIN_X = 37;
      var SHIFT_END_MAIN_PIN_Y = 77;
      var address = document.getElementById('address');
      var mainPinX = parseFloat(window.util.variable.mainPin.style.left);
      var mainPinY = parseFloat(window.util.variable.mainPin.style.top);
      var coordsEndMainPin = [(mainPinX + SHIFT_END_MAIN_PIN_X), (mainPinY + SHIFT_END_MAIN_PIN_Y)];
      address.value = coordsEndMainPin.join(', ');
      address.placeholder = address.value;
    }
  };
  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      var T, k;
      if (this == null) {
        throw new TypeError(' this is null or not defined');
      }
      var O = Object(this);
      var len = O.length >>> 0;
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
      if (arguments.length > 1) {
        T = thisArg;
      }
      k = 0;
      while (k < len) {
        var kValue;
        if (k in O) {
          kValue = O[k];
          callback.call(T, kValue, k, O);
        }
        k++;
      }
    };
  }
  return window.util;
})();
