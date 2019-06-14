'use strict';

var typesFlats = ['palace', 'flat', 'house', 'bungalo'];
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ads = [];

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

var activatedMap = function () {
  document.querySelector('.map').classList.toggle('map--faded', false);
};

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

activatedMap();
createdAds();

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

renderPins();
