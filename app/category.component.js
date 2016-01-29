System.register(['angular2/core', 'angular2/router', './mongoapi.service', './init-case-pipe'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, mongoapi_service_1, init_case_pipe_1;
    var CategoryComponent;
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
            function (init_case_pipe_1_1) {
                init_case_pipe_1 = init_case_pipe_1_1;
            }],
        execute: function() {
            CategoryComponent = (function () {
                function CategoryComponent(service, router, routeParams) {
                    var _this = this;
                    this.service = service;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.files = null;
                    this.catname = "";
                    this.catname = this.routeParams.get("catname");
                    this.service.mongoGet('files', '{cat:"' + this.catname + '"}').subscribe(function (data) { return _this.files = data; });
                }
                CategoryComponent.prototype.gotoFile = function (catname, fileid, filename) {
                    filename = filename.replace(/ /g, "-").toLowerCase();
                    this.router.navigate(['File', { catname: catname, fileid: fileid, filename: filename }]);
                };
                CategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'category',
                        templateUrl: 'app/view/category.html',
                        pipes: [init_case_pipe_1.InitCasePipe],
                        providers: [mongoapi_service_1.MongoAPIService]
                    }), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService, router_1.Router, router_1.RouteParams])
                ], CategoryComponent);
                return CategoryComponent;
            })();
            exports_1("CategoryComponent", CategoryComponent);
        }
    }
});
//# sourceMappingURL=category.component.js.map