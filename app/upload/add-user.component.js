System.register(['angular2/core', 'angular2/router', '../service/mongoapi.service'], function(exports_1) {
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
    var core_1, router_1, mongoapi_service_1;
    var AddUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (mongoapi_service_1_1) {
                mongoapi_service_1 = mongoapi_service_1_1;
            }],
        execute: function() {
            AddUserComponent = (function () {
                function AddUserComponent(service) {
                    this.service = service;
                    this.formSubmitted = false;
                    this.usernameAlreadyExists = false;
                }
                AddUserComponent.prototype.onSubmit = function (userForm) {
                    var _this = this;
                    this.service.mongoSelect("users", "{username:'" + userForm.username + "'}").subscribe(function (data) {
                        if (data.length > 0) {
                            _this.usernameAlreadyExists = true;
                        }
                        else {
                            // Select the max user ID
                            _this.service.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(function (data) {
                                userForm.id = data[0].id + 1; // the new user will have maxID+1
                                userForm.password = _this.simpleHash(userForm.password);
                                userForm.session = "";
                                _this.service.mongoInsert("users", userForm).subscribe();
                            });
                            _this.formSubmitted = true;
                        }
                    });
                };
                AddUserComponent.prototype.simpleHash = function (psw) {
                    var hash = 0, i, chr, len;
                    if (psw.length === 0)
                        return hash.toString();
                    for (i = 0, len = psw.length; i < len; i++) {
                        chr = psw.charCodeAt(i);
                        hash = ((hash << 5) - hash) + chr;
                        hash |= 0;
                    }
                    return hash.toString();
                };
                AddUserComponent = __decorate([
                    core_1.Component({
                        selector: 'add-user',
                        templateUrl: 'app/template/addUser.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService])
                ], AddUserComponent);
                return AddUserComponent;
            }());
            exports_1("AddUserComponent", AddUserComponent);
        }
    }
});
//# sourceMappingURL=add-user.component.js.map