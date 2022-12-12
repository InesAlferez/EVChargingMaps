"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var gmaps_service_1 = require("./gmaps.service");
describe('GmapsService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(gmaps_service_1.GmapsService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

//# sourceMappingURL=gmaps.service.spec.js.map
