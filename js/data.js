'use strict';

(function () {
    var xhr = new XMLHttpRequest;
    var card = [];
    xhr.open('get', 'https://js.dump.academy/keksobooking/data');
    xhr.send();

    var onError = function () {
            var template = document.getElementById('error').content.querySelector('.error').cloneNode(true);
            template.querySelector('.')
            document.querySelector('main').appendChild(template);

              };
  
xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        card = JSON.parse(xhr.responseText)
      } else {
        onError()
      }
    });
    
    xhr.addEventListener('error', function () {
      onError();
    });


    window.renderPins = function () {
        var fragment = document.createDocumentFragment();
        var template = document.getElementById('pin').content.querySelector('.map__pin').cloneNode(true);
        for (var i = 0; i < card.length; i++) {
          var pin = template.cloneNode(true);
          pin.style.left = card[i].location.x - 31 + 'px';
          pin.style.top = card[i].location.y - 70 + 'px';
          pin.querySelector('img').src = card[i].author.avatar;
          fragment.appendChild(pin);
        }
        document.querySelector('.map__pins').appendChild(fragment);
    };
}) ()