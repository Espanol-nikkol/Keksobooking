'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var sizeMainPin = window.util.const.SizeMainPin;
  var pinsAll = [];
  var pins = [];

  window.card = [];
  xhr.open('get', 'https://js.dump.academy/keksobooking/data');
  xhr.send();

  var onError = function () {
    var template = document.getElementById('error').content.querySelector('.error').cloneNode(true);
    document.querySelector('main').appendChild(template);
    var errorMessage = document.querySelector('.error');
    var errorBtn = document.querySelector('.error__button');
    var onCLickErrorBtn = function () {
      errorMessage.remove();
    };

    var onEscErrorBtn = function (evt) {
      if (evt.keyCode === window.util.const.KEYCODE_ESC) {
        errorMessage.remove();
        document.removeEventListener('keydown', onEscErrorBtn);
      }
    };
    errorBtn.addEventListener('click', onCLickErrorBtn);
    document.addEventListener('keydown', onEscErrorBtn);
  };
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      window.card = JSON.parse(xhr.responseText);
    } else {
      onError();
    }
  });

  xhr.addEventListener('error', function () {
    onError();
  });

  var isNoMainPin = function (elem) {
    return elem.className === 'map__pin';
  };

  window.clearPins = function () {
    pinsAll = [].slice.call(document.querySelectorAll('.map__pin'));
    pins = pinsAll.filter(isNoMainPin).forEach(function (elem) {
      elem.remove();
    });
  };

  window.renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    var template = document.getElementById('pin').content.querySelector('.map__pin').cloneNode(true);
    arr
      .slice(0, 5)
      .forEach(function (elem) {
        var pin = template.cloneNode(true);
        pin.style.left = elem.location.x - sizeMainPin.WIDTH / 2 + 'px';
        pin.style.top = elem.location.y - sizeMainPin.WIDTH + 'px';
        pin.querySelector('img').src = elem.author.avatar;
        pin.addEventListener('click', function () {
          window.renderPopUp(elem);
        });
        fragment.appendChild(pin);
      });
    document.querySelector('.map__pins').appendChild(fragment);
  };
})();
