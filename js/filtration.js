'use strict';

(function () {
  var houseTypeFilter = document.getElementById('housing-type');
  var index = '';
  var houseTypeSelected = '';
  var isHouseType = function (elem) {
    if (houseTypeSelected === 'any') {
      return true;
    }
    return elem.offer.type === houseTypeSelected;
  };

  var onFilterOfHouseType = function () {
    index = houseTypeFilter.options.selectedIndex;
    houseTypeSelected = houseTypeFilter.options[index].value;
    var cardFilter = window.card.filter(isHouseType);
    window.clearPins();
    window.renderPins(cardFilter);
  };

  houseTypeFilter.addEventListener('change', onFilterOfHouseType);
})();
