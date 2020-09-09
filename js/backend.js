'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var xhr = new XMLHttpRequest();
  var sizeMainPin = window.util.const.SizeMainPin;
  var pinsAll = [];
  var fieldTitle = document.getElementById('title');
  var fieldPrice = document.getElementById('price');
  var fieldType = document.getElementById('type');
  var fieldTimeIn = document.getElementById('timein');
  var fieldTimeOut = document.getElementById('timeout');
  var fieldGuests = document.getElementById('capacity');
  var fieldRooms = document.getElementById('room_number');
  var submitBtn = document.querySelector('.ad-form__submit');
  var mainPin = window.util.variable.mainPin;
  var selectedIndex = '';

  window.card = [];

  var isNoMainPin = function (elem) {
    return elem.className === 'map__pin';
  };

  window.clearPins = function () {
    pinsAll = [].slice.call(document.querySelectorAll('.map__pin'));
    pinsAll.filter(isNoMainPin).forEach(function (elem) {
      elem.remove();
    });
  };

  window.renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    var template = document.getElementById('pin').content.querySelector('.map__pin').cloneNode(true);
    arr
      .slice(0, 5)
      .forEach(function (elem) {
        var pin = template.cloneNode(true);
        pin.style.left = elem.location.x - sizeMainPin.WIDTH / 2 + 'px';
        pin.style.top = elem.location.y - sizeMainPin.WIDTH + 'px';
        pin.querySelector('img').src = elem.author.avatar;
        pin.addEventListener('click', function () {
          window.renderPopUp(elem);
        });
        fragment.appendChild(pin);
      });
    document.querySelector('.map__pins').appendChild(fragment);
  };

  var validationTypesPrice = function () {
    switch (fieldType.value) {
      case 'flat':
        fieldPrice.min = window.Price.flat;
        fieldPrice.placeholder = window.Price.flat;
        break;
      case 'house':
        fieldPrice.min = window.Price.house;
        fieldPrice.placeholder = window.Price.house;
        break;
      case 'palace':
        fieldPrice.min = window.Price.palace;
        fieldPrice.placeholder = window.Price.palace;
        break;
      default:
        fieldPrice.min = window.Price.bungalo;
        fieldPrice.placeholder = window.Price.bungalo;
        break;
    }
    isValidity(fieldPrice);
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
    var selectedRoom = fieldRooms.value;
    if (selectedRoom === '100') {
      selectedRoom = 0;
    }

    for (var i = 0; i < fieldGuests.length; i++) {
      fieldGuests.options[i].disabled = selectedRoom < fieldGuests[i].value;
    }
    if (selectedRoom > 0) {
      fieldGuests.options[3].disabled = true;
    }

    if (fieldGuests.selectedOptions[0].disabled) {
      stateError(fieldGuests);
    } else {
      stateSuccess(fieldGuests);
    }
  };

  var onError = function () {
    var template = document.getElementById('error').content.querySelector('.error').cloneNode(true);

    document.querySelector('main').appendChild(template);

    var errorMessage = document.querySelector('.error');
    var onCLickErrorBtn = function () {
      errorMessage.remove();
    };
    var onEscErrorBtn = function (evt) {
      if (evt.keyCode === window.util.const.Keycode.ESC) {
        errorMessage.remove();
        document.removeEventListener('keydown', onEscErrorBtn);
      }
    };

    document.querySelectorAll('input').forEach(function (elem) {
      isValidity(elem);
    });

    document.addEventListener('click', onCLickErrorBtn);
    document.addEventListener('keydown', onEscErrorBtn);
  };

  var onSubmitClick = function () {
    var formData = new FormData(document.querySelector('.ad-form'));
    xhr = new XMLHttpRequest();
    xhr.open('post', 'https://javascript.pages.academy/keksobooking');
    xhr.send(formData);

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

      successMessage.addEventListener('click', function () {
        successMessage.remove();
      });
      document.addEventListener('keydown', onEscSuccess);
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
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

  var turnOffFields = function () {
    window.fields.forEach(function (elem) {
      elem.disabled = false;
    });
  };

  var deactivatedMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', true);
    turnOffFields();
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
      document.querySelector('.popup').remove();
    }
    document.querySelectorAll('.feature__checkbox').forEach(function (elem) {
      elem.checked = false;
    });
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    stateSuccess(fieldGuests);
    stateSuccess(fieldTitle);
    stateSuccess(fieldPrice);
  };

  var stateSuccess = function (field) {
    field.style.border = '1px solid #d9d9d3';
  };

  var stateError = function (field) {
    field.style.border = '3px solid red';
  };

  var isValidity = function (field) {
    field.checkValidity();
    if (field.validity.valid) {
      stateSuccess(field);
    } else {
      stateError(field);
    }
  };

  var loadAvatar = function (evt) {
    var fReader = new FileReader();
    fReader.readAsDataURL(document.querySelector('#' + evt.target.id).files[0]);
    fReader.onloadend = function (evt) {
      document.querySelector(".ad-form-preview--header img").src = evt.target.result;
    }
  }

  var loadPhotos = function (evt) {
    var fReader = new FileReader();
    fReader.readAsDataURL(document.querySelector('#' + evt.target.id).files[0]);
    fReader.onloadend = function (evt) {
      var img = document.createElement('img')
      img.width = '40'
      img.height = '44'
      img.style.marginRight = '15px'

      img.src = evt.target.result;
      var wrapper = document.querySelector(".ad-form-preview--photos")
      wrapper.appendChild(img)
      console.log((wrapper.children.length/5))
      if (wrapper.children.length % 5 != 0 && wrapper.children.length <= 5) {
        wrapper.style.width = 70 + 55 * (wrapper.children.length-1) + 'px'
      } else if (wrapper.children.length % 5 === 0) {
        wrapper.style.height = 70 + 85* ~~(wrapper.children.length / 5) + 'px'
      }
      console.log(wrapper.style.width)
    }
  }

  xhr.open('get', 'https://javascript.pages.academy/keksobooking/data');
  xhr.send();
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      window.card = JSON.parse(xhr.responseText);
    } else {
      onError();
    }
  });
  xhr.addEventListener('error', function () {
    onError();
  });

  fieldTitle.addEventListener('input', function () {
    isValidity(fieldTitle);
  });
  fieldPrice.addEventListener('input', function () {
    isValidity(fieldPrice);
  });
  fieldGuests.addEventListener('change', function () {
    if (fieldGuests.selectedOptions[0].disabled) {
      stateError(fieldGuests);
    } else {
      stateSuccess(fieldGuests);
    }
  });
  fieldType.addEventListener('change', validationTypesPrice);
  fieldTimeIn.addEventListener('change', validationTimeIn);
  fieldTimeOut.addEventListener('change', validationTimeOut);
  fieldRooms.addEventListener('change', validationRoomsGuests);
  document.querySelector('#avatar').addEventListener('change', loadAvatar);
  document.querySelector('#images').addEventListener('change', loadPhotos);

  submitBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    onSubmitClick();
  });
  document.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatedMap();
  });
})();
