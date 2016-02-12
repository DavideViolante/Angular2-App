System.register(['angular2/core', 'angular2/router', './model/file-model', './pipe/init-case-pipe', './service/mongoapi.service', './account/authentication.component'], function(exports_1) {
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
    var core_1, router_1, file_model_1, init_case_pipe_1, mongoapi_service_1, authentication_component_1;
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
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            }],
        execute: function() {
            FileComponent = (function () {
                function FileComponent(service, routeParams, router, auth) {
                    var _this = this;
                    this.service = service;
                    this.routeParams = routeParams;
                    this.router = router;
                    this.auth = auth;
                    this.file = new file_model_1.File();
                    this.fileid = "";
                    this.catname = "";
                    this.cats = null;
                    this.isSelected = false;
                    this.isEditing = false;
                    this.editingComplete = false;
                    this.fileDeleted = false;
                    // get the file clicked from the URL
                    this.fileid = this.routeParams.get("fileid");
                    this.catname = this.routeParams.get("catname");
                    // get the file from the ID
                    this.service.mongoSelect('files', '{id:' + this.fileid + '}').subscribe(function (data) {
                        _this.file = data[0];
                        _this.mainScreen = data[0].imgurl[0];
                    });
                    this.service.mongoSelect('cats', '').subscribe(function (data) { return _this.cats = data; });
                }
                FileComponent.prototype.setMainScreen = function (screen) {
                    this.mainScreen = screen;
                    this.isSelected = true;
                };
                FileComponent.prototype.liked = function (file) {
                    this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { likes: file.likes + 1 }).subscribe();
                    file.likes++;
                };
                FileComponent.prototype.disliked = function (file) {
                    this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { dislikes: file.dislikes + 1 }).subscribe();
                    file.dislikes++;
                };
                FileComponent.prototype.downloaded = function (file) {
                    this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { dls: file.dls + 1 }).subscribe();
                    file.dls++;
                };
                FileComponent.prototype.editFile = function () {
                    this.isEditing = true;
                };
                FileComponent.prototype.isEditingCancel = function () {
                    this.isEditing = false;
                };
                FileComponent.prototype.isEditingDone = function (fileEdited) {
                    var _this = this;
                    if (typeof fileEdited.authors === "string")
                        fileEdited.authors = fileEdited.authors.replace(/, /g, ",").split(',');
                    this.service.mongoUpdate("files", "{id:" + fileEdited.id + "}", fileEdited).subscribe();
                    this.isEditing = false;
                    this.editingComplete = true;
                    setTimeout(function () { return _this.editingComplete = false; }, 3000);
                };
                FileComponent.prototype.deleteFile = function (fileid) {
                    var _this = this;
                    if (window.confirm("Are you sure you want to permanently delete this file?")) {
                        this.service.mongoSelect("files", "{id:" + fileid + "}").subscribe(function (data) { return _this.service.mongoDelete("files", data[0]._id.$oid).subscribe(); });
                        this.fileDeleted = true;
                        setTimeout(function () {
                            _this.fileDeleted = false;
                            _this.router.navigate(['Category', { catname: _this.catname }]);
                        }, 2500);
                    }
                    else {
                        this.fileDeleted = false;
                    }
                };
                FileComponent = __decorate([
                    core_1.Component({
                        selector: 'file',
                        templateUrl: 'app/template/file.html',
                        pipes: [init_case_pipe_1.InitCasePipe],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService, router_1.RouteParams, router_1.Router, authentication_component_1.AuthenticationComponent])
                ], FileComponent);
                return FileComponent;
            }());
            exports_1("FileComponent", FileComponent);
        }
    }
});
//# sourceMappingURL=file.component.js.map