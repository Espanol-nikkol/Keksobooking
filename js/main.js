'use strict';

var KEYCODE_ENTER = 27;
var BORDER_MAP_LEFT = 96;
var BORDER_MAP_RIGHT = 1166;
var BORDER_MAP_TOP = 130;
var BORDER_MAP_BOTTOM = 630;
var SHIFT_END_MAIN_PIN_X = 37; 
var SHIFT_END_MAIN_PIN_Y = 77;

var typesFlats = ['palace', 'flat', 'house', 'bungalo'];
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ads = [];
var fieldPrice = document.getElementById('price');
var fieldType = document.getElementById('type');
var mainPin = document.querySelector('.map__pin--main');
var fieldTimeIn = document.getElementById('timein');
var fieldTimeOut = document.getElementById('timeout');
var map = document.querySelector('.map');

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
  var coordEndMainPin = {
    x: mainPinX + SHIFT_END_MAIN_PIN_X,
    y: mainPinY+ SHIFT_END_MAIN_PIN_Y
  }
  address.value = coordEndMainPin.x + ', ' + coordEndMainPin.y;
  address.placeholder = coordEndMainPin.x + ', ' + coordEndMainPin.y;
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
        x: getRandomNumber(BORDER_MAP_LEFT, BORDER_MAP_RIGHT),
        y: getRandomNumber(BORDER_MAP_TOP, BORDER_MAP_BOTTOM)
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





var onMainPinMouseDown = function(evt) {
  evt.preventDefault()
  var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    }  
    var onMainPinMouseMove = function(evtMove) {
      evtMove.preventDefault();
    var shift = {
      x: startCoord.x - evtMove.clientX,
      y: startCoord.y - evtMove.clientY
    }

    startCoord = {
      x: evtMove.clientX,
      y: evtMove.clientY
    }

    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    getAddress();
    if (mainPin.offsetTop <= BORDER_MAP_TOP) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      mainPin.style.top = mainPin.style.top + 1;
    }
    if (mainPin.offsetTop >= BORDER_MAP_BOTTOM) {
      map.removeEventListener('mousemove', onMainPinMouseMove);
      mainPin.style.top = mainPin.style.top - 1;
    }
  }


    //document.removeEventListener('mousemove', onMainPinMouseMove);
    
    
  var onMainPinMouseUp = function (evtUp) {
    evtUp.preventDefault();
    map.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  }
      activatedMap()

    map.addEventListener('mousemove', onMainPinMouseMove)
  document.addEventListener('mouseup', onMainPinMouseUp);
}




mainPin.addEventListener('mousedown', onMainPinMouseDown);
mainPin.addEventListener('keydown', onMainPinPressEnter);
createdAds();
fieldType.addEventListener('change', validationTypesPrice);
fieldTimeIn.addEventListener('change', validationTimeIn);
fieldTimeOut.addEventListener('change', validationTimeOut);