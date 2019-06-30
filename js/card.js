'use strict';

(function () {

  var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var ads = [];
  var typesFlats = ['palace', 'flat', 'house', 'bungalo'];
  var consts = window.util.const;
  var getAvatar = function () {
    var number = window.util.getRandomNumber(0, avatars.length - 1);
    var numberAvatar = avatars[number];
    avatars.splice(number, 1);
    return numberAvatar;
  };

  var createdAds = function () {
    for (var i = 0; i < 8; i++) {
      ads[i] = {
        author: 'img/avatars/user' + getAvatar() + '.png',
        offer: typesFlats[window.util.getRandomNumber(0, 3)],
        location: {
          x: window.util.getRandomNumber(consts.BORDER_MAP_LEFT, consts.BORDER_MAP_RIGHT),
          y: window.util.getRandomNumber(consts.BORDER_MAP_TOP, consts.BORDER_MAP_BOTTOM)
        }
      };
    }
  };

  createdAds();

  window.renderPins = function () {
    var fragment = document.createDocumentFragment();
    var template = document.getElementById('pin').content.querySelector('.map__pin').cloneNode(true);
    for (var i = 0; i < ads.length; i++) {
      var pin = template.cloneNode(true);
      pin.style.left = ads[i].location.x - 31 + 'px';
      pin.style.top = ads[i].location.y - 70 + 'px';
      pin.firstElementChild.src = ads[i].author;
      fragment.appendChild(pin);
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };
})();
