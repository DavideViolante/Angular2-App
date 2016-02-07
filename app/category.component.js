System.register(['angular2/core', 'angular2/router', './service/mongoapi.service', './pipe/init-case-pipe', './pipe/trim-lowercase-pipe', './pipe/sort-by-name-pipe', './pipe/sort-by-dls-pipe', './pipe/filter-pipe'], function(exports_1) {
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
    var core_1, router_1, mongoapi_service_1, init_case_pipe_1, trim_lowercase_pipe_1, sort_by_name_pipe_1, sort_by_dls_pipe_1, filter_pipe_1;
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
            },
            function (trim_lowercase_pipe_1_1) {
                trim_lowercase_pipe_1 = trim_lowercase_pipe_1_1;
            },
            function (sort_by_name_pipe_1_1) {
                sort_by_name_pipe_1 = sort_by_name_pipe_1_1;
            },
            function (sort_by_dls_pipe_1_1) {
                sort_by_dls_pipe_1 = sort_by_dls_pipe_1_1;
            },
            function (filter_pipe_1_1) {
                filter_pipe_1 = filter_pipe_1_1;
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
                    this.sortByName = 1;
                    this.sortByDLS = 0;
                    this.query = "";
                    this.totFiles = 0;
                    this.skip = 0;
                    this.filesPerPage = 10;
                    this.noMoreNext = true;
                    this.noMorePrev = true;
                    this.catname = this.routeParams.get("catname");
                    // Counting the total number of files
                    this.service.mongoSelect('files', '{cat:"' + this.catname + '"}&c=true').subscribe(function (data) {
                        _this.setTotFiles(data);
                        if ((_this.skip + _this.filesPerPage) <= _this.totFiles)
                            _this.noMoreNext = false;
                    });
                    this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(function (data) { return _this.files = data; });
                }
                CategoryComponent.prototype.setTotFiles = function (totFiles) {
                    this.totFiles = totFiles;
                };
                CategoryComponent.prototype.firstPageValues = function () {
                    this.skip = 0;
                    this.noMoreNext = false;
                    this.noMorePrev = true;
                };
                CategoryComponent.prototype.nextPage = function () {
                    if ((this.skip + this.filesPerPage) <= this.totFiles)
                        this.skip += this.filesPerPage;
                    if ((this.skip + this.filesPerPage) >= this.totFiles)
                        this.noMoreNext = true;
                    this.noMorePrev = false;
                };
                CategoryComponent.prototype.prevPage = function () {
                    // Back on first page
                    if (this.skip - this.filesPerPage === 0)
                        this.noMorePrev = true;
                    this.skip -= this.filesPerPage;
                    this.noMoreNext = false;
                };
                CategoryComponent.prototype.changeSortByName = function () {
                    this.sortByName > 0 ? this.sortByName = -1 : this.sortByName = 1;
                    // Back on first page
                    this.firstPageValues();
                };
                CategoryComponent.prototype.changeSortByDLS = function () {
                    this.sortByDLS < 0 ? this.sortByDLS = 1 : this.sortByDLS = -1;
                    // Back on first page
                    this.firstPageValues();
                };
                CategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'category',
                        templateUrl: 'app/template/category.html',
                        pipes: [init_case_pipe_1.InitCasePipe, trim_lowercase_pipe_1.TrimLowerCasePipe, sort_by_name_pipe_1.SortByNamePipe, sort_by_dls_pipe_1.SortByDLSPipe, filter_pipe_1.FilterPipe],
                        providers: [mongoapi_service_1.MongoAPIService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService, router_1.RouteParams, router_1.Router])
                ], CategoryComponent);
                return CategoryComponent;
            }());
            exports_1("CategoryComponent", CategoryComponent);
        }
    }
});
/*if (fileCache.cat.indexOf(this.catname) === -1)
    this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(
        data => {
            this.files = data;
            fileCache.files.push({ cat: this.catname, data: data });
            fileCache.cat.push(this.catname);
        }
    );
else this.files = fileCache.files.find(obj => obj.cat === this.catname).data;*/
/*var fileCache = {
    files: [
            {
                cat: "",
                data: {}
            }
        ],
    cat: []
};
*/ 
//# sourceMappingURL=category.component.js.map