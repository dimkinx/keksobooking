'use strict';

(function (types) {
  var OFFERS_NUM = 8;

  var offerTypes = Object.keys(types.offerTypeToMinPrice);

  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var makePin = function (id) {
    return {
      author: {
        avatar: 'img/avatars/user' + id + '.png',
      },
      offer: {
        type: getRandomItem(offerTypes),
      },
      location: {
        x: getRandomNumber(types.MapRect.LEFT, types.MapRect.RIGHT),
        y: getRandomNumber(types.MapRect.TOP, types.MapRect.BOTTOM),
      },
    };
  };

  var getPinIds = function (number) {
    return Array(number).fill(null).map(function (_, index) {
      index += 1;
      return index < 10 ? '0' + index : String(index);
    });
  };

  var getPins = function (number) {
    return getPinIds(number || OFFERS_NUM).map(makePin);
  };

  window.mock = {
    load: getPins,
  };
})(window.types);
