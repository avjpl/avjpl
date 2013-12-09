'use strict';

angular.module('ClientApp').filter('cdate', function () {
  return function (input, format) {
    return moment(input).format(format);
  };
});