System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2;
    var MongoAPIService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            MongoAPIService = (function () {
                function MongoAPIService(http) {
                    this.http = http;
                    this.mongoURL = "https://api.mongolab.com/api/1/databases/masterthesis/collections/";
                    this.apiKey = "DrWjz1L1mpb4g0701x7BS7VAC-vxBlpr";
                }
                // f: fields to include: {id:1}  1 yes, 0 no
                // s: sort direction: {id:-1}    1 ASC -1 DESC
                MongoAPIService.prototype.mongoSelectOne = function (collection, field, sort) {
                    return this.http.get(this.mongoURL + collection + '?f=' + field + '&s=' + sort + '&l=1&apiKey=' + this.apiKey)
                        .map(function (res) { return res.json(); });
                };
                MongoAPIService.prototype.mongoSelect = function (collection, query) {
                    return this.http.get(this.mongoURL + collection + '?q=' + query + '&apiKey=' + this.apiKey)
                        .map(function (res) { return res.json(); });
                };
                MongoAPIService.prototype.mongoInsert = function (collection, fileObj) {
                    var headers = new http_2.Headers();
                    headers.append("Content-Type", "application/json");
                    return this.http.post(this.mongoURL + collection + "?apiKey=" + this.apiKey, JSON.stringify(fileObj), // {"x":1, "y":2}
                    { headers: headers }).map(function (res) { return res.json(); });
                };
                MongoAPIService.prototype.mongoUpdate = function (collection, fileID, newValueObj) {
                    var headers = new http_2.Headers();
                    headers.append("Content-Type", "application/json");
                    return this.http.put(this.mongoURL + collection + '?q=' + fileID + '&apiKey=' + this.apiKey, //{"_id":123}
                    JSON.stringify({ "$set": newValueObj }), //{ "x": 3 }
                    { headers: headers }).map(function (res) { return res.json(); });
                };
                MongoAPIService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MongoAPIService);
                return MongoAPIService;
            })();
            exports_1("MongoAPIService", MongoAPIService);
        }
    }
});
//# sourceMappingURL=mongoapi.service.js.map