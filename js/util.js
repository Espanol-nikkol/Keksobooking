'use strict';
(function () {
  window.util = {
    const: {
      KEYCODE_ENTER: 13,
      BORDER_MAP_LEFT: 26,
      BORDER_MAP_RIGHT: 1166,
      BORDER_MAP_TOP: 200,
      BORDER_MAP_BOTTOM: 600
    },
    variable: {
      mainPin: document.querySelector('.map__pin--main')
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === this.consts.KEYCODE_ENTER) {
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
      var coordEndMainPin = {
        x: mainPinX + SHIFT_END_MAIN_PIN_X,
        y: mainPinY + SHIFT_END_MAIN_PIN_Y
      };
      address.value = coordEndMainPin.x + ', ' + coordEndMainPin.y;
      address.placeholder = coordEndMainPin.x + ', ' + coordEndMainPin.y;
    }
  };
  return window.util;
})();
