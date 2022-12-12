"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var FolderPage = /** @class */ (function () {
    function FolderPage(gmaps, renderer, actionSheetCtrl) {
        this.gmaps = gmaps;
        this.renderer = renderer;
        this.actionSheetCtrl = actionSheetCtrl;
        // this is the center of the map
        this.center = { lat: 35.1850678, lng: -84.8877585 };
        // this is the array of markers
        this.markers = [];
    }
    FolderPage.prototype.ngOnInit = function () {
    };
    // this is the function that gets called when the map is ready
    FolderPage.prototype.ngAfterViewInit = function () {
        this.loadMap();
    };
    // this is the function that loads the map
    FolderPage.prototype.loadMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var googleMaps, mapEl, location, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.gmaps.loadingGoogleMaps()];
                    case 1:
                        googleMaps = _a.sent();
                        this.googleMaps = googleMaps;
                        mapEl = this.mapElementRef.nativeElement;
                        location = new googleMaps.LatLng(this.center.lat, this.center.lng);
                        this.map = new googleMaps.Map(mapEl, {
                            center: location,
                            zoom: 12
                        });
                        this.renderer.addClass(mapEl, 'visible');
                        this.addMarker(location);
                        this.onMapClick();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FolderPage.prototype.onMapClick = function () {
        var _this = this;
        this.mapClickListener = this.googleMaps.event.addListener(this.map, "click", function (mapsMouseEvent) {
            console.log(mapsMouseEvent.latLng.toJSON());
            _this.addMarker(mapsMouseEvent.latLng);
        });
    };
    // this is the function that adds a marker to the map
    FolderPage.prototype.addMarker = function (location) {
        var _this = this;
        var googleMaps = this.googleMaps;
        var icon = {
            url: 'assets/icons/location-pin.png',
            scaledSize: new googleMaps.Size(50, 50)
        };
        var marker = new googleMaps.Marker({
            position: location,
            map: this.map,
            icon: icon,
            // draggable: true,
            animation: googleMaps.Animation.DROP
        });
        this.markers.push(marker);
        // this.presentActionSheet();
        this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', function () {
            console.log('markerclick', marker);
            _this.checkAndRemoveMarker(marker);
            console.log('markers: ', _this.markers);
        });
    };
    // this is the function that removes a marker from the map
    FolderPage.prototype.checkAndRemoveMarker = function (marker) {
        var index = this.markers.findIndex(function (x) { return x.position.lat() == marker.position.lat() && x.position.lng() == marker.position.lng(); });
        console.log('is marker already: ', index);
        if (index >= 0) {
            this.markers[index].setMap(null);
            this.markers.splice(index, 1);
            return;
        }
    };
    // this is the function that presents the action sheet
    FolderPage.prototype.presentActionSheet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetCtrl.create({
                            header: 'Added Marker',
                            subHeader: '',
                            buttons: [
                                {
                                    text: 'Remove',
                                    role: 'destructive',
                                    data: {
                                        action: 'delete'
                                    }
                                },
                                {
                                    text: 'Save',
                                    data: {
                                        action: 'share'
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    data: {
                                        action: 'cancel'
                                    }
                                },
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // this is the function that gets called when the page is destroyed
    FolderPage.prototype.ngOnDestroy = function () {
        this.googleMaps.event.removeAllListeners();
        if (this.mapClickListener)
            this.googleMaps.event.removeListener(this.mapClickListener);
        if (this.markerClickListener)
            this.googleMaps.event.removeListener(this.markerClickListener);
    };
    __decorate([
        core_1.ViewChild('map', { static: true })
    ], FolderPage.prototype, "mapElementRef");
    FolderPage = __decorate([
        core_1.Component({
            selector: 'app-folder',
            templateUrl: './folder.page.html',
            styleUrls: ['./folder.page.scss']
        })
    ], FolderPage);
    return FolderPage;
}());
exports.FolderPage = FolderPage;

//# sourceMappingURL=folder.page.js.map
