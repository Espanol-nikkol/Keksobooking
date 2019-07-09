'use strict';
(function () {
  var fieldPrice = document.getElementById('price');
  var fieldType = document.getElementById('type');
  var fieldTimeIn = document.getElementById('timein');
  var fieldTimeOut = document.getElementById('timeout');
  var fieldGuests = document.getElementById('capacity');
  var fieldRooms = document.getElementById('room_number');
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

  validationRooms();
  fieldType.addEventListener('change', validationTypesPrice);
  fieldTimeIn.addEventListener('change', validationTimeIn);
  fieldTimeOut.addEventListener('change', validationTimeOut);
  fieldRooms.addEventListener('change', validationRoomsGuests);
})();
