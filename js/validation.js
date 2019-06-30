'use strict';

var fieldPrice = document.getElementById('price');
var fieldType = document.getElementById('type');
var fieldTimeIn = document.getElementById('timein');
var fieldTimeOut = document.getElementById('timeout');

var validationTypesPrice = function () {
  var selectedIndex = fieldType.options.selectedIndex;
  if (fieldType.options[selectedIndex].value === 'flat') {
    fieldPrice.min = '1000';
    fieldPrice.placeholder = '1000';
  } else if (fieldType.options[selectedIndex].value === 'house') {
    fieldPrice.min = '5000';
    fieldPrice.placeholder = '5000';
  } else if (fieldType.options[selectedIndex].value === 'palace') {
    fieldPrice.min = '10000';
    fieldPrice.placeholder = '10000';
  } else (
    fieldPrice.min = '0',
    fieldPrice.placeholder = '0'
    )
}

var validationTimeIn = function () {
  var selectedIndex = fieldTimeIn.options.selectedIndex;
  fieldTimeOut.options[selectedIndex].selected = true;
}

var validationTimeOut = function () {
  var selectedIndex = fieldTimeOut.options.selectedIndex;
  fieldTimeIn.options[selectedIndex].selected = true;
}


fieldType.addEventListener('change', validationTypesPrice);
fieldTimeIn.addEventListener('change', validationTimeIn);
fieldTimeOut.addEventListener('change', validationTimeOut);
