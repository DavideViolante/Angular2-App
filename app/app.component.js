System.register(['angular2/core', 'angular2/router', './service/mongoapi.service', './home.component', './account/login.component', './account/logout.component', './account/register.component', './upload/upload.component', './categories.component', './category.component', './file.component'], function(exports_1) {
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
    var core_1, router_1, mongoapi_service_1, home_component_1, login_component_1, logout_component_1, register_component_1, upload_component_1, categories_component_1, category_component_1, file_component_1;
    var AppComponent;
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
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (upload_component_1_1) {
                upload_component_1 = upload_component_1_1;
            },
            function (categories_component_1_1) {
                categories_component_1 = categories_component_1_1;
            },
            function (category_component_1_1) {
                category_component_1 = category_component_1_1;
            },
            function (file_component_1_1) {
                file_component_1 = file_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(service) {
                    this.service = service;
                    this.isLoggedIn = false;
                    this.isAdmin = false;
                    this.checkUser();
                }
                AppComponent.prototype.checkUser = function () {
                    var _this = this;
                    this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(function (data) {
                        if (data.length > 0) {
                            (data[0].session === localStorage.getItem("session")) ? _this.isLoggedIn = true : _this.isLoggedIn = false;
                            (data[0].role === "admin") ? _this.isAdmin = true : _this.isAdmin = false;
                        }
                        else {
                            _this.isLoggedIn = false;
                            _this.isAdmin = false;
                        }
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/template/home.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Home', component: home_component_1.HomeComponent },
                        { path: '/account/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/account/logout', name: 'Logout', component: logout_component_1.LogoutComponent },
                        { path: '/account/register', name: 'Register', component: register_component_1.RegisterComponent },
                        { path: '/upload/...', name: 'Upload', component: upload_component_1.UploadComponent },
                        { path: '/category', name: 'Categories', component: categories_component_1.CategoriesComponent },
                        { path: '/category/:catname', name: 'Category', component: category_component_1.CategoryComponent },
                        { path: '/category/:catname/:fileid/:filename', name: 'File', component: file_component_1.FileComponent }
                    ]), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map