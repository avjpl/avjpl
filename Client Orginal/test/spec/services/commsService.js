'use strict';

describe('Service: commsService', function () {

  // load the service's module
  beforeEach(module('ClientApp'));

  // instantiate service
  var commsService;
  beforeEach(inject(function (_commsService_) {
    commsService = _commsService_;
  }));

  it('should do something', function () {
    expect(!!commsService).toBe(true);
  });

});
