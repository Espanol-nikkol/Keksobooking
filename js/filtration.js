'use strict';

(function () {
  var houseTypeFilter = document.getElementById('housing-type');
  var priceFilter = document.getElementById('housing-price');
  var roomFilter = document.getElementById('housing-rooms');
  var guestFilter = document.getElementById('housing-guests');

  var index = '';
  var houseTypeSelected = '';
  var roomSelected = '';
  var priceSelected = '';
  var guestSelected = '';

  window.Price = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
    'low': 10000,
    'medium': 50000
  };

  var getHouseType = function (elem) {
    filters.house.flag = false;
    if (houseTypeSelected === 'any') {
      return true;
    }
    filters.house.flag = true;
    return elem.offer.type === houseTypeSelected;
  };

  var getRoomCount = function (elem) {
    filters.rooms.flag = false;
    if (roomSelected === 'any') {
      return true;
    }
    filters.rooms.flag = true;
    return elem.offer.rooms === Number(roomSelected);
  };

  var getPrice = function (elem) {
    filters.price.flag = false;
    if (priceSelected === 'any') {
      return true;
    }
    filters.price.flag = true;
    var currentPrice = elem.offer.price;
    switch (priceSelected) {
      case 'low':
        return currentPrice <= window.Price.low;
      case 'middle':
        return (currentPrice >= window.Price.low && currentPrice <= window.Price.medium);
      case 'high':
        return currentPrice >= window.Price.medium;
    }
    return undefined;
  };

  var getGuest = function (elem) {
    filters.guests.flag = false;
    if (guestSelected === 'any') {
      return true;
    }
    filters.guests.flag = true;
    return elem.offer.guests === Number(guestSelected);
  };

  var updatePins = function (cont) {
    if (cont.flag) {
      window.clearPins();
      window.removePopUp();
      window.renderPins(window.cardFilter);
    }
  };

  var filters = {
    house: {
      name: 'houseType',
      flag: false,
      filter: function () {
        this.flag = true;

        index = houseTypeFilter.options.selectedIndex;
        houseTypeSelected = houseTypeFilter.options[index].value;
        window.cardFilter = window.cardFilter.filter(getHouseType);
        updatePins(this);
      }
    },
    rooms: {
      name: 'rooms',
      flag: false,
      filter: function () {
        this.flag = true;

        index = roomFilter.options.selectedIndex;
        roomSelected = roomFilter.options[index].value;
        window.cardFilter = window.cardFilter.filter(getRoomCount);
        updatePins(this);
      }
    },
    price: {
      name: 'price',
      flag: false,
      filter: function () {
        this.flag = true;
        index = priceFilter.options.selectedIndex;
        priceSelected = priceFilter.options[index].value;
        window.cardFilter = window.cardFilter.filter(getPrice);
        updatePins(this);
      }
    },
    guests: {
      name: 'guests',
      flag: false,
      filter: function () {
        this.flag = true;
        index = guestFilter.options.selectedIndex;
        guestSelected = guestFilter.options[index].value;
        window.cardFilter = window.cardFilter.filter(getGuest);
        updatePins(this);
      }
    },
    features: {
      name: 'features',
      flag: false,
      filter: function () {
        this.flag = true;
        document.querySelectorAll('.map__checkbox').forEach(function (elem) {
          if (elem.checked) {
            window.cardFilter = window.cardFilter.filter(function (elem2) {
              return elem2.offer.features.includes(elem.value);
            });
          }
        });
        updatePins(this);
      }
    }
  };
  document.querySelector('.map__filters').addEventListener('change', function () {
    window.cardFilter = window.card.slice();
    window.debounce(filters.house.filter);
    window.debounce(filters.rooms.filter);
    window.debounce(filters.price.filter);
    window.debounce(filters.guests.filter);
    window.debounce(filters.features.filter);
  });
})();
