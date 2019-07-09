'use strict';

(function () {
  window.renderPopUp = function (pin) {
    var fragment = document.createDocumentFragment();
    var template = document.getElementById('card').content.querySelector('.map__card').cloneNode(true);
    var featuresList = template.querySelectorAll('.popup__feature');
    var map = document.querySelector('.map');
    var mapLastChild = map.lastElementChild;
    template.querySelector('.popup__title').textContent = pin.offer.title;
    template.querySelector('.popup__text--address').textContent = pin.offer.address;
    template.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = window.util.houseEnToHouseRu[pin.offer.type];
    template.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    var featuresAll = [].slice.call(featuresList);
    var isFeatures = function (elem) {
      for (var i = 0; i < pin.offer.features.length; i++) {
        var string = 'popup__feature popup__feature--' + pin.offer.features[i];
        if (elem.className === string) {
          var flag = true;
        }
      }
      return flag;
    };
    var featuresFilter = featuresAll.filter(isFeatures);
    featuresList.forEach(function (elem) {
      elem.remove();
    });
    featuresFilter.forEach(function (elem) {
      template.querySelector('.popup__features').appendChild(elem);
    });
    template.querySelector('.popup__description').textContent = pin.offer.description;
    var photos = template.querySelector('.popup__photos');

    pin.offer.photos.forEach(function (elem) {
      var img = template.querySelector('.popup__photo').cloneNode(true);
      img.src = elem;
      photos.appendChild(img);
    });
    photos.firstElementChild.remove();
    template.querySelector('.popup__avatar').src = pin.author.avatar;
    fragment.appendChild(template);
    if (mapLastChild.className === 'map__card popup') {
      mapLastChild.remove();
    }
    map.appendChild(fragment);
  };
})();
