System.register(['angular2/core'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var InitCasePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InitCasePipe = (function () {
                function InitCasePipe() {
                }
                InitCasePipe.prototype.transform = function (value) {
                    if (value)
                        return value.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
                            return m.toUpperCase();
                        });
                };
                InitCasePipe = __decorate([
                    core_1.Pipe({ name: 'initCase' }), 
                    __metadata('design:paramtypes', [])
                ], InitCasePipe);
                return InitCasePipe;
            }());
            exports_1("InitCasePipe", InitCasePipe);
        }
    }
});
//# sourceMappingURL=init-case-pipe.js.map