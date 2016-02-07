System.register(['angular2/core', 'angular2/router', './model/file-model', './pipe/init-case-pipe', './service/mongoapi.service'], function(exports_1) {
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
    var core_1, router_1, file_model_1, init_case_pipe_1, mongoapi_service_1;
    var FileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (file_model_1_1) {
                file_model_1 = file_model_1_1;
            },
            function (init_case_pipe_1_1) {
                init_case_pipe_1 = init_case_pipe_1_1;
            },
            function (mongoapi_service_1_1) {
                mongoapi_service_1 = mongoapi_service_1_1;
            }],
        execute: function() {
            FileComponent = (function () {
                function FileComponent(service, routeParams) {
                    var _this = this;
                    this.service = service;
                    this.routeParams = routeParams;
                    this.file = new file_model_1.File();
                    this.catname = "";
                    this.isSelected = false;
                    this.isEditing = false;
                    // get the file clicked from the URL
                    var fileid = this.routeParams.get("fileid");
                    this.catname = this.routeParams.get("catname");
                    // get the file from the ID
                    this.service.mongoSelect('files', '{id:' + fileid + '}').subscribe(function (data) {
                        _this.file = data[0];
                        _this.mainScreen = _this.file.imgurl[0];
                    });
                }
                FileComponent.prototype.setMainScreen = function (screen) {
                    this.mainScreen = screen;
                    this.isSelected = true;
                };
                FileComponent.prototype.editFile = function () { this.isEditing = true; };
                FileComponent.prototype.isEditingCancel = function () { this.isEditing = false; };
                FileComponent.prototype.isEditingDone = function (fileEdited) {
                    this.service.mongoUpdate("files", "{id:" + fileEdited.id + "}", fileEdited).subscribe();
                    this.isEditing = false;
                };
                FileComponent = __decorate([
                    core_1.Component({
                        selector: 'file',
                        templateUrl: 'app/template/file.html',
                        pipes: [init_case_pipe_1.InitCasePipe],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService, router_1.RouteParams])
                ], FileComponent);
                return FileComponent;
            }());
            exports_1("FileComponent", FileComponent);
        }
    }
});
//# sourceMappingURL=file.component.js.map