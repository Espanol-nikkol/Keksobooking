'use strict';

(function () {
  var houseTypeFilter = document.getElementById('housing-type');
  var priceFilter = document.getElementById('housing-price');
  var roomFilter = document.getElementById('housing-rooms');
  var guestFilter = document.getElementById('housing-guests');
  var featuresFilter = document.getElementById('housing-features');
  var cardFilter = [];

  var index = '';
  var houseTypeSelected = '';
  var roomSelected = '';
  var priceSelected = '';
  var guestSelected = '';
  var featuresSelected = [];
  var checks = [];

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
  }

  var getPrice = function (elem) {
    filters.price.flag = false;
    if (priceSelected === 'any') {
      return true;
    }
    filters.price.flag = true;
    var currentPrice = elem.offer.price;
    switch (priceSelected) {
      case 'low':
      return currentPrice <= 10000;
      break;
      case 'middle':
      return (currentPrice >= 10000 && currentPrice <= 50000);
      break;
      case 'high':
      return currentPrice >= 50000;
      break;
    }
  }

  var getGuest = function (elem) {
    filters.guests.flag = false;
    if (guestSelected === 'any') {
      return true;
    }
    filters.guests.flag = true;
    return elem.offer.guests === Number(guestSelected);
  }

  var getFeatures = function (elem) {
    checks = document.querySelectorAll('.map__checkbox').forEach(function(elem) {
      if (elem.checked) {
        checks.push(elem.value)
      }
    })

  }

  var filters = {
    house: {
      name: 'houseType',
      flag: false,
      filter: function () {
        this.flag = true;

        index = houseTypeFilter.options.selectedIndex;
        houseTypeSelected = houseTypeFilter.options[index].value;
        window.cardFilter = window.cardFilter.filter(getHouseType);
        if (this.flag) {
          window.clearPins();
          window.removePopUp();
          window.renderPins(window.cardFilter);}
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
          if (this.flag) {
            window.clearPins();
            window.removePopUp();
            window.renderPins(window.cardFilter);}
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
            if (this.flag) {
              window.clearPins();
              window.removePopUp();
              window.renderPins(window.cardFilter);}
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
              if (this.flag) {
                window.clearPins();
                window.removePopUp();
                window.renderPins(window.cardFilter)}
              }
            },
            features: {
              name: 'features',
              flag: false,
              filter: function () {
                this.flag = true;
                document.querySelectorAll('.map__checkbox').forEach(function(elem) {
                  if (elem.checked) {
                    window.cardFilter = window.cardFilter.filter(function(elem2) {
                      return elem2.offer.features.includes(elem.value)
                    })
                  }
                })
                if (this.flag) {
                  window.clearPins();
                  window.removePopUp();
                  window.renderPins(window.cardFilter)
                }
              }
            }
          }

          document.querySelector('.map__filters').addEventListener('change', function () {
            window.cardFilter = window.card.slice();
            window.debounce(filters.house.filter);
            window.debounce(filters.rooms.filter);
            window.debounce(filters.price.filter);
            window.debounce(filters.features.filter)
          })
        })();