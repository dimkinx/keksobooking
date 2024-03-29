'use strict';

(function () {
  var MainPinSize = window.import('MainPinSize').from('types');
  var MainPinRect = window.import('MainPinRect').from('types');
  var MainPinCoordinate = window.import('MainPinCoordinate').from('types');
  var factories = window.import('makeDragStart', 'makeDragOnce').from('util.factories');
  var mapElement = window.import('mapElement').from('util.domRef');

  var mainPinButton = mapElement.querySelector('.map__pin--main');

  var getMainPinPosition = function (height) {
    return {
      x: mainPinButton.offsetLeft + MainPinSize.RADIUS,
      y: mainPinButton.offsetTop + height,
    };
  };

  var renderMainPin = function (x, y) {
    mainPinButton.style.left = x + 'px';
    mainPinButton.style.top = y + 'px';
  };

  var mainPinStartHandler = function () {
    return {
      x: mainPinButton.offsetLeft,
      y: mainPinButton.offsetTop,
    };
  };

  var initMainPin = function (changeHandler, moveHandler) {
    var mainPinDragHandler = function (x, y) {
      x = Math.min(Math.max(x, MainPinRect.LEFT), MainPinRect.RIGHT);
      y = Math.min(Math.max(y, MainPinRect.TOP), MainPinRect.BOTTOM);

      renderMainPin(x, y);

      moveHandler(getMainPinPosition(MainPinSize.HEIGHT));
    };

    var mainPinDragOnceHandler = factories.makeDragOnce(changeHandler);
    var mainPinDragStartHandler = factories.makeDragStart(mainPinStartHandler, mainPinDragHandler);

    mainPinButton.addEventListener('mousedown', mainPinDragOnceHandler, {once: true});
    mainPinButton.addEventListener('mousedown', mainPinDragStartHandler);
  };

  var resetMainPin = function (changeHandler) {
    renderMainPin(MainPinCoordinate.X, MainPinCoordinate.Y);

    var mainPinDragOnceHandler = factories.makeDragOnce(changeHandler);
    mainPinButton.addEventListener('mousedown', mainPinDragOnceHandler, {once: true});
  };

  window.export({
    getMainPinPosition: getMainPinPosition,
    initMainPin: initMainPin,
    resetMainPin: resetMainPin,
  }).to('ui.mainPin');
})();
