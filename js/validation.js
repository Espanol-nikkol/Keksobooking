'use strict';
(function () {
  var fieldPrice = document.getElementById('price');
  var fieldType = document.getElementById('type');
  var fieldTimeIn = document.getElementById('timein');
  var fieldTimeOut = document.getElementById('timeout');
  var fieldGuests = document.getElementById('capacity');
  var fieldRooms = document.getElementById('room_number');
  var submitBtn = document.querySelector('.ad-form__submit');
  var mainPin = window.util.variable.mainPin;
  var selectedIndex = '';

  var validationTypesPrice = function () {
    selectedIndex = fieldType.options.selectedIndex;
    switch (fieldType.options[selectedIndex].value) {
      case 'flat':
        fieldPrice.min = '1000';
        fieldPrice.placeholder = '1000';
        break;
      case 'house':
        fieldPrice.min = '5000';
        fieldPrice.placeholder = '5000';
        break;
      case 'palace':
        fieldPrice.min = '10000';
        fieldPrice.placeholder = '10000';
        break;
      default:
        fieldPrice.min = '0';
        fieldPrice.placeholder = '0';
        break;
    }
  };

  var validationTimeIn = function () {
    selectedIndex = fieldTimeIn.options.selectedIndex;
    fieldTimeOut.options[selectedIndex].selected = true;
  };

  var validationTimeOut = function () {
    selectedIndex = fieldTimeOut.options.selectedIndex;
    fieldTimeIn.options[selectedIndex].selected = true;
  };

  var validationRoomsGuests = function () {
    selectedIndex = fieldRooms.options.selectedIndex;
    var selectedRoom = fieldRooms.options[selectedIndex].value;
    if (selectedRoom === '100') {
      selectedRoom = 0;
    }
    for (var i = 0; i < fieldGuests.length; i++) {
      if (selectedRoom < fieldGuests[i].value) {
        fieldGuests.options[i].disabled = true;
      } else {
        fieldGuests.options[i].disabled = false;
      }
    }
  };

  var onSubmitClick = function () {
    var formData = new FormData(document.querySelector('.ad-form'));
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://js.dump.academy/keksobooking');
    xhr.send(formData);
    var onError = function () {
      var template = document.getElementById('error').content.querySelector('.error').cloneNode(true);

      document.querySelector('main').appendChild(template);

      var errorMessage = document.querySelector('.error');
      var errorBtn = document.querySelector('.error__button');
      var onCLickErrorBtn = function () {
        errorMessage.remove();
      };
      var onEscErrorBtn = function (evt) {
        if (evt.keyCode === window.util.const.Keycode.ESC) {
          errorMessage.remove();
          document.removeEventListener('keydown', onEscErrorBtn);
        }
      };

      document.addEventListener('click', onCLickErrorBtn);
      document.addEventListener('keydown', onEscErrorBtn);
    };

    var onSuccess = function () {
      var template = document.getElementById('success').content.querySelector('.success').cloneNode(true);

      document.querySelector('main').appendChild(template);

      var successMessage = document.querySelector('.success');
      var onEscSuccess = function (evt) {
        if (evt.keyCode === window.util.const.Keycode.ESC) {
          successMessage.remove();
          document.removeEventListener('keydown', onEscSuccess);
        }
      };

      document.addEventListener('click', function () {
        successMessage.remove();
      });
      document.addEventListener('keydown', onEscSuccess);
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
        deactivatedMap();
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });
  };

  var deactivatedMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', true);
    document.querySelectorAll('fieldset').forEach(function (elem) {
      elem.disabled = true;
    });
    document.querySelectorAll('.map__pin')
        .forEach(function (elem, index) {
          if (index > 0) {
            elem.remove();
          }
        });
    window.flagOfActivation = 1;
    mainPin.style.left = '571px';
    mainPin.style.top = '375px';
    window.util.getAddress();
    fieldType.value = 'bungalo';
    document.getElementById('title').value = '';
    fieldPrice.value = '0';
    fieldTimeIn.value = '12:00';
    fieldTimeOut.value = '12:00';
    fieldRooms.value = '1';
    fieldGuests.value = '0';
    document.getElementById('description').value = '';
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove()
    };
    document.querySelectorAll('.feature__checkbox').forEach(function (elem) {
      elem.checked = false;
    });
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

  };

  validationRoomsGuests();
  fieldType.addEventListener('change', validationTypesPrice);
  fieldTimeIn.addEventListener('change', validationTimeIn);
  fieldTimeOut.addEventListener('change', validationTimeOut);
  fieldRooms.addEventListener('change', validationRoomsGuests);
  submitBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    onSubmitClick();
  });
  document.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatedMap();
  });
})();
