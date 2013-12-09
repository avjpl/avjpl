'use strict';

describe('Filter: cdate', function () {

  // load the filter's module
  beforeEach(module('ClientApp'));

  // initialize a new instance of the filter before each test
  var cdate;
  beforeEach(inject(function ($filter) {
    cdate = $filter('cdate');
  }));

  it('should return the input prefixed with "cdate filter:"', function () {
    var text = 'angularjs';
    expect(cdate(text)).toBe('cdate filter: ' + text);
  });

});
