'use strict';

var KEYCODE_ENTER = 27;

var typesFlats = ['palace', 'flat', 'house', 'bungalo'];
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ads = [];
var fieldPrice = document.getElementById('price');
var fieldType = document.getElementById('type');
var mainPin = document.querySelector('.map__pin--main');
var fieldTimeIn = document.getElementById('timein');
var fieldTimeOut = document.getElementById('timeout');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return randomNumber;
};

var getAvatar = function () {
  var number = getRandomNumber(0, avatars.length - 1);
  var numberAvatar = avatars[number];
  avatars.splice(number, 1);
  return numberAvatar;
};

var getAddress = function () {
  var address = document.getElementById('address');
  var mainPinX = parseFloat(mainPin.style.left);
  var mainPinY = parseFloat(mainPin.style.top);
  address.value = mainPinX + 37 + ', ' + (mainPinY + 77);
  address.placeholder = mainPinX + 37 + ', ' + (mainPinY + 77);
}

var activatedMap = function () {
  document.querySelector('.map').classList.toggle('map--faded', false);
  var fields = document.querySelectorAll('fieldset');
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = false;
  }
  getAddress();
  renderPins();
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
};

var onMainPinPressEnter = function (evt) {
  if (evt.keycode === KEYCODE_ENTER) {
    activatedMap();
  }
}

var createdAds = function () {
  for (var i = 0; i < 8; i++) {
    ads[i] = {
      author: 'img/avatars/user' + getAvatar() + '.png',
      offer: typesFlats[getRandomNumber(0, 3)],
      location: {
        x: getRandomNumber(96, 1166),
        y: getRandomNumber(214, 714)
      }
    };
  }
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  var template = document.getElementById('pin').content.querySelector('.map__pin').cloneNode(true);
  for (var i = 0; i < ads.length; i++) {
    var pin = template.cloneNode(true);
    pin.style.left = ads[i].location.x - 31 + 'px';
    pin.style.top = ads[i].location.y - 84 + 'px';
    pin.firstElementChild.src = ads[i].author;
    fragment.appendChild(pin);
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

var validationTypesPrice = function () {
  var selectedIndex = fieldType.options.selectedIndex;
  if (fieldType.options[selectedIndex].value === 'flat') {
    fieldPrice.min = '1000';
    fieldPrice.placeholder = '1000';
  } else if (fieldType.options[selectedIndex].value === 'house') {
    fieldPrice.min = '5000';
    fieldPrice.placeholder = '5000';
  } else if (fieldType.options[selectedIndex].value === 'palace') {
    fieldPrice.min = '10000';
    fieldPrice.placeholder = '10000';
  } else (
    fieldPrice.min = '0',
    fieldPrice.placeholder = '0'
    )
}

var validationTimeIn = function () {
  var selectedIndex = fieldTimeIn.options.selectedIndex;
  fieldTimeOut.options[selectedIndex].selected = true;
}

var validationTimeOut = function () {
  var selectedIndex = fieldTimeOut.options.selectedIndex;
  fieldTimeIn.options[selectedIndex].selected = true;
}

mainPin.addEventListener('click', activatedMap);
mainPin.addEventListener('keydown', onMainPinPressEnter);
createdAds();
fieldType.addEventListener('change', validationTypesPrice);
fieldTimeIn.addEventListener('change', validationTimeIn);
fieldTimeOut.addEventListener('change', validationTimeOut);
document.addEventListener('invalid', function () {
})