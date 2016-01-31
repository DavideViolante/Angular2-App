System.register(['angular2/core', 'angular2/router', './service/mongoapi.service', './pipe/init-case-pipe', './pipe/trim-lowercase-pipe', './pipe/sort-by-name-pipe', './pipe/sort-by-dls-pipe'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, mongoapi_service_1, init_case_pipe_1, trim_lowercase_pipe_1, sort_by_name_pipe_1, sort_by_dls_pipe_1;
    var CategoryComponent, defaultSort, defaultSortDLS, fileCache;
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
            },
            function (trim_lowercase_pipe_1_1) {
                trim_lowercase_pipe_1 = trim_lowercase_pipe_1_1;
            },
            function (sort_by_name_pipe_1_1) {
                sort_by_name_pipe_1 = sort_by_name_pipe_1_1;
            },
            function (sort_by_dls_pipe_1_1) {
                sort_by_dls_pipe_1 = sort_by_dls_pipe_1_1;
            }],
        execute: function() {
            CategoryComponent = (function () {
                function CategoryComponent(service, routeParams, router) {
                    var _this = this;
                    this.service = service;
                    this.routeParams = routeParams;
                    this.router = router;
                    this.files = null;
                    this.catname = "";
                    this.defaultSort = 1;
                    this.defaultSortDLS = 0;
                    this.catname = this.routeParams.get("catname");
                    if (fileCache.cat.indexOf(this.catname) === -1)
                        this.service.mongoGet('files', '{cat:"' + this.catname + '"}').subscribe(function (data) {
                            _this.files = data;
                            fileCache.files.push({ cat: _this.catname, data: data });
                            fileCache.cat.push(_this.catname);
                        });
                    else
                        this.files = fileCache.files.find(function (obj) { return obj.cat === _this.catname; }).data;
                    // cache
                    this.defaultSort = defaultSort;
                    this.defaultSortDLS = defaultSortDLS;
                }
                /*changeSort() {
                    this.defaultSort > 0 ? this.defaultSort = -1 : this.defaultSort = 1;
                }
                changeSortDLS() {
                    this.defaultSortDLS > 0 ? this.defaultSortDLS = -1 : this.defaultSortDLS = 1;
                }*/
                CategoryComponent.prototype.changeSort = function () {
                    if (this.defaultSort > 0) {
                        this.defaultSort = -1;
                        defaultSort = this.defaultSort;
                    }
                    else {
                        this.defaultSort = 1;
                        defaultSort = this.defaultSort;
                    }
                };
                CategoryComponent.prototype.changeSortDLS = function () {
                    if (this.defaultSortDLS > 0) {
                        this.defaultSortDLS = -1;
                        defaultSortDLS = this.defaultSortDLS;
                    }
                    else {
                        this.defaultSortDLS = 1;
                        defaultSortDLS = this.defaultSortDLS;
                    }
                };
                CategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'category',
                        templateUrl: 'app/view/category.html',
                        pipes: [init_case_pipe_1.InitCasePipe, trim_lowercase_pipe_1.TrimLowerCasePipe, sort_by_name_pipe_1.SortByNamePipe, sort_by_dls_pipe_1.SortByDLSPipe],
                        providers: [mongoapi_service_1.MongoAPIService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService, router_1.RouteParams, router_1.Router])
                ], CategoryComponent);
                return CategoryComponent;
            })();
            exports_1("CategoryComponent", CategoryComponent);
            defaultSort = 1;
            defaultSortDLS = 0;
            fileCache = {
                files: [
                    {
                        cat: "",
                        data: {}
                    }
                ],
                cat: []
            };
        }
    }
});
//# sourceMappingURL=category.component.js.map