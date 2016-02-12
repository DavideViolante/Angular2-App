System.register(['angular2/core', 'angular2/router', './service/mongoapi.service', './pipe/init-case-pipe', './pipe/trim-lowercase-pipe', './pipe/no-decimal-values-pipe', './pipe/sort-by-name-pipe', './pipe/sort-by-dls-pipe', './pipe/filter-pipe'], function(exports_1) {
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
    var core_1, router_1, mongoapi_service_1, init_case_pipe_1, trim_lowercase_pipe_1, no_decimal_values_pipe_1, sort_by_name_pipe_1, sort_by_dls_pipe_1, filter_pipe_1;
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
            function (no_decimal_values_pipe_1_1) {
                no_decimal_values_pipe_1 = no_decimal_values_pipe_1_1;
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
                    this.files = new Array();
                    this.catname = "";
                    this.sortByName = 1; // ASCending order
                    this.sortByDLS = 0; // no order
                    this.query = "";
                    this.totFiles = 0;
                    this.skip = 0;
                    this.filesPerPage = 9;
                    this.noMoreNext = true;
                    this.noMorePrev = true;
                    this.catname = this.routeParams.get("catname");
                    // Counting the total number of files
                    this.service.mongoCount('files', '{cat:"' + this.catname + '"}').subscribe(function (data) {
                        _this.totFiles = data;
                        if ((_this.skip + _this.filesPerPage) <= _this.totFiles)
                            _this.noMoreNext = false;
                    });
                    this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(function (data) { return _this.files = data; });
                    if (this.routeParams.get("sortname")) {
                        this.routeParams.get("sortname") === "asc" ? this.sortByName = 1 : this.sortByName = -1;
                    }
                    if (this.routeParams.get("sortdls")) {
                        this.routeParams.get("sortdls") === "asc" ? this.sortByDLS = -1 : this.sortByDLS = 1;
                    }
                    // gotta figure out how to make this work...
                    /*if (this.routeParams.get("page")) {
                        var page = +this.routeParams.get("page");
                        for (var i = 1; i < page; i++)
                            this.nextPage();
                    }*/
                }
                // Don't reload the component when clicking sorting buttons
                CategoryComponent.prototype.routerCanReuse = function (next, prev) { return true; };
                CategoryComponent.prototype.firstPageValues = function () {
                    this.skip = 0;
                    this.noMorePrev = true;
                    (this.totFiles < this.filesPerPage) ? this.noMoreNext = true : this.noMoreNext = false;
                };
                CategoryComponent.prototype.nextPage = function () {
                    if ((this.skip + this.filesPerPage) <= this.totFiles) {
                        this.skip += this.filesPerPage;
                        //this.router.navigate(['Category', { catname: this.catname, page: this.skip / this.filesPerPage + 1 }]);
                        if ((this.skip + this.filesPerPage) >= this.totFiles)
                            this.noMoreNext = true;
                    }
                    this.noMorePrev = false;
                };
                CategoryComponent.prototype.prevPage = function () {
                    if (this.skip - this.filesPerPage === 0)
                        this.noMorePrev = true;
                    this.skip -= this.filesPerPage;
                    //this.router.navigate(['Category', { catname: this.catname, page: this.skip / this.filesPerPage + 1 }]);
                    this.noMoreNext = false;
                };
                CategoryComponent.prototype.changeSortByName = function () {
                    // Back on first page
                    this.firstPageValues();
                    if (this.sortByName > 0) {
                        this.sortByName = -1;
                        this.router.navigate(['Category', { catname: this.catname, sortname: "desc" }]);
                    }
                    else {
                        this.sortByName = 1;
                        this.router.navigate(['Category', { catname: this.catname, sortname: "asc" }]);
                    }
                };
                CategoryComponent.prototype.changeSortByDLS = function () {
                    // Back on first page
                    this.firstPageValues();
                    if (this.sortByDLS < 0) {
                        this.sortByDLS = 1;
                        this.router.navigate(['Category', { catname: this.catname, sortdls: "asc" }]);
                    }
                    else {
                        this.sortByDLS = -1;
                        this.router.navigate(['Category', { catname: this.catname, sortdls: "desc" }]);
                    }
                };
                CategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'category',
                        templateUrl: 'app/template/category.html',
                        pipes: [init_case_pipe_1.InitCasePipe, trim_lowercase_pipe_1.TrimLowerCasePipe, no_decimal_values_pipe_1.NoDecimalValues, sort_by_name_pipe_1.SortByNamePipe, sort_by_dls_pipe_1.SortByDLSPipe, filter_pipe_1.FilterPipe],
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