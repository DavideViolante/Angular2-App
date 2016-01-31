System.register(['angular2/core', 'angular2/router', '../service/mongoapi.service', './file-model'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, mongoapi_service_1, file_model_1;
    var AddFileComponent;
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
            function (file_model_1_1) {
                file_model_1 = file_model_1_1;
            }],
        execute: function() {
            AddFileComponent = (function () {
                function AddFileComponent(service) {
                    this.service = service;
                    this.file = new file_model_1.File(-1, "", "", "");
                    this.formSubmitted = false;
                }
                AddFileComponent.prototype.onSubmit = function (fileForm) {
                    fileForm.form.value.id = 51;
                    this.service.mongoPostTest("files", fileForm.form.value).subscribe();
                    this.formSubmitted = true;
                };
                AddFileComponent = __decorate([
                    core_1.Component({
                        selector: 'add-file',
                        templateUrl: 'app/view/addFile.html',
                        providers: [mongoapi_service_1.MongoAPIService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [mongoapi_service_1.MongoAPIService])
                ], AddFileComponent);
                return AddFileComponent;
            })();
            exports_1("AddFileComponent", AddFileComponent);
        }
    }
});
//# sourceMappingURL=add-file.component.js.map