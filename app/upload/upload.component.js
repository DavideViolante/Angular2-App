System.register(['angular2/core', 'angular2/router', './upload-home.component', './add-user.component', './add-file.component', '../account/is-logged-in', '../account/authentication.component'], function(exports_1) {
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
    var core_1, router_1, upload_home_component_1, add_user_component_1, add_file_component_1, is_logged_in_1, authentication_component_1;
    var UploadComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (upload_home_component_1_1) {
                upload_home_component_1 = upload_home_component_1_1;
            },
            function (add_user_component_1_1) {
                add_user_component_1 = add_user_component_1_1;
            },
            function (add_file_component_1_1) {
                add_file_component_1 = add_file_component_1_1;
            },
            function (is_logged_in_1_1) {
                is_logged_in_1 = is_logged_in_1_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            }],
        execute: function() {
            UploadComponent = (function () {
                function UploadComponent(auth) {
                    this.auth = auth;
                }
                UploadComponent = __decorate([
                    core_1.Component({
                        selector: 'upload',
                        templateUrl: 'app/template/upload.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'UploadHome', component: upload_home_component_1.UploadHomeComponent, useAsDefault: true },
                        { path: '/addFile', name: 'AddFile', component: add_file_component_1.AddFileComponent },
                        { path: '/addUser', name: 'AddUser', component: add_user_component_1.AddUserComponent }
                    ]),
                    router_1.CanActivate(function (next, previous) {
                        return is_logged_in_1.isLoggedIn(next, previous);
                    }), 
                    __metadata('design:paramtypes', [authentication_component_1.AuthenticationComponent])
                ], UploadComponent);
                return UploadComponent;
            }());
            exports_1("UploadComponent", UploadComponent);
        }
    }
});
//# sourceMappingURL=upload.component.js.map