'use strict';

(function () {
  var houseTypeFilter = document.getElementById('housing-type');
  var priceFilter = document.getElementById('housing-price');
  var roomFilter = document.getElementById('housing-rooms');
  var guestFilter = document.getElementById('housing-guests');

  var usedFilterTypes = false;
  var usedFilterPrice = false;
  var usedFilterRoom = false;
  var usedFilterGuest = false;

  var index = '';
  var houseTypeSelected = '';
  var roomSelected = '';
  var priceSelected = '';
  var guestSelected = '';
  var cardFilter = [];

  var getHouseType = function (elem) {
    usedFilterTypes = false
    if (houseTypeSelected === 'any') {
      return true;
    }
    usedFilterTypes = true;
    return elem.offer.type === houseTypeSelected;
  };

  var getRoomCount = function (elem) {
    usedFilterRoom = false;
    if (roomSelected === 'any') {
      return true;
    }
    usedFilterRoom = true;
    return elem.offer.rooms === Number(roomSelected);
  }

  var getPrice = function (elem) {
    usedFilterPrice = false;
    if (priceSelected === 'any') {
      return true;
    }
    usedFilterRoom = true;
    return elem.offer.price === Number(priceSelected);
  }

  var getGuest = function (elem) {
    usedFilterGuest = false;
    if (guestSelected === 'any') {
      return true;
    }
    usedFilterGuest = true;
    return elem.offer.guests === Number(guestSelected);
  }

  var isFilterUse = function (filter) {
    switch (true) {
      case usedFilterTypes:
        cardFilter = window.card.filter(getHouseType);
        cardFilter = cardFilter.filter(filter);
      case usedFilterGuest:
        cardFilter = window.card.filter(getGuest);
        cardFilter = cardFilter.filter(filter);
      case usedFilterRoom:
        cardFilter = window.card.filter(getRoomCount);
        cardFilter = cardFilter.filter(filter);
      case usedFilterPrice:
        cardFilter = window.card.filter(getPrice);
        cardFilter = cardFilter.filter(filter);
        break;
      default:
        cardFilter = window.card.filter(filter)
    }
  }

  var onFilterOfHouseType = function () {
    index = houseTypeFilter.options.selectedIndex;
    houseTypeSelected = houseTypeFilter.options[index].value;
    isFilterUse(getHouseType)
    window.clearPins();
    window.removePopUp();
    window.renderPins(cardFilter);
  };

  var onFilterOfRooms = function () {
    index = roomFilter.options.selectedIndex;
    roomSelected = roomFilter.options[index].value;
    isFilterUse(getRoomCount);
    window.clearPins();
    window.removePopUp();
    window.renderPins(cardFilter);
  }

  var onFilterOfPrice = function () {
    index = priceFilter.options.selectedIndex;
    priceSelected = priceFilter.options[index].value;
    isFilterUse(getPrice);
    window.clearPins();
    window.removePopUp();
    window.renderPins(cardFilter);
  }  

  var onFilterOfGuest= function () {
    index = guestFilter.options.selectedIndex;
    guestSelected = guestFilter.options[index].value;
    isFilterUse(getGuest);
    window.clearPins();
    window.removePopUp();
    window.renderPins(cardFilter);
  }  

  houseTypeFilter.addEventListener('change', onFilterOfHouseType);
  roomFilter.addEventListener('change', onFilterOfRooms);
  priceFilter.addEventListener('change', onFilterOfPrice);
  guestFilter.addEventListener('change', onFilterOfGuest);
})();
