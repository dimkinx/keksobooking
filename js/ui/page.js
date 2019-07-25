'use strict';

(function () {
  var map = window.import('*').from('ui.map');
  var filter = window.import('*').from('ui.filter');
  var ad = window.import('*').from('ui.ad');

  var activate = function () {
    map.activate();
    filter.activate();
    ad.activate();
  };

  var deactivate = function () {
    map.deactivate();
    filter.deactivate();
    ad.deactivate();
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.page');
})();