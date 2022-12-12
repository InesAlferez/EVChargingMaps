"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var GmapsService = /** @class */ (function () {
    function GmapsService() {
    }
    GmapsService.prototype.loadingGoogleMaps = function () {
        var win = window;
        var gModule = win.google;
        if (gModule && gModule.maps) {
            return Promise.resolve(gModule.maps);
        }
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZaBSwxq4Aguvl76DoA4B5SYMlX5s3yrM';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = function () {
                var gModule = win.google;
                if (gModule && gModule.maps) {
                    resolve(gModule.maps);
                }
                else {
                    reject('Google maps SDK not available');
                }
            };
        });
    };
    GmapsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GmapsService);
    return GmapsService;
}());
exports.GmapsService = GmapsService;

//# sourceMappingURL=gmaps.service.js.map
