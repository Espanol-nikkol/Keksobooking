'use strict';

(function () {
  window.removePopUp = function () {
    if (document.querySelector('.map__pin--active')) {
      document.querySelector('.map__pin--active').classList.remove('map__pin--active')
    }
    var mapLastChild = document.querySelector('.map').lastElementChild;
    if (mapLastChild.className === 'map__card popup') {
      mapLastChild.remove();
    }      
  }

  window.renderPopUp = function (pin) {
    var fragment = document.createDocumentFragment();
    var template = document.getElementById('card').content.querySelector('.map__card').cloneNode(true);
    var featuresList = template.querySelectorAll('.popup__feature');
    var map = document.querySelector('.map');
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
    var photos = template.querySelector('.popup__photos');
    var onEscPress = function (evt) {
      window.util.isEscEvent(evt, function () {
        document.querySelector('.map__card').remove();
        document.querySelector('.map__pin--active').classList.remove('map__pin--active')
        document.removeEventListener('keydown', onEscPress);
      });
    };
    var featuresFilter = featuresAll.filter(isFeatures);
    var setFeaturesList = function () {
      featuresList.forEach(function (elem) {
        elem.remove();
      });
      featuresFilter.forEach(function (elem) {
        template.querySelector('.popup__features').appendChild(elem);
      });
    };

    var setPhotos = function () {
      pin.offer.photos.forEach(function (elem) {
        var img = template.querySelector('.popup__photo').cloneNode(true);
        img.src = elem;
        photos.appendChild(img);
      });
      photos.firstElementChild.remove();
    };

    template.querySelector('.popup__title').textContent = pin.offer.title;
    template.querySelector('.popup__text--address').textContent = pin.offer.address;
    template.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = window.util.houseEnToHouseRu[pin.offer.type];
    template.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    template.querySelector('.popup__avatar').src = pin.author.avatar;
    template.querySelector('.popup__description').textContent = pin.offer.description;
    setFeaturesList();
    setPhotos();


    document.addEventListener('keydown', onEscPress);

    fragment.appendChild(template);
    window.removePopUp();
    map.appendChild(fragment);
    document.querySelector('.popup__close').addEventListener('click', function () {
      map.querySelector('.map__card').remove();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active')
    });
  };
})();
