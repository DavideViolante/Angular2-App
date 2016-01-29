System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var DialogService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Async modal dialog service
             * DialogService makes this app easier to test by faking this service.
             * TODO: better modal implemenation that doesn't use window.confirm
             */
            DialogService = (function () {
                function DialogService() {
                }
                /**
                 * Ask user to confirm an action. `message` explains the action and choices.
                 * Returns promise resolving to `true`=confirm or `false`=cancel
                 */
                DialogService.prototype.confirm = function (message) {
                    return new Promise(function (resolve, reject) {
                        return resolve(window.confirm(message || 'Is it OK?'));
                    });
                };
                ;
                DialogService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DialogService);
                return DialogService;
            })();
            exports_1("DialogService", DialogService);
        }
    }
});
//# sourceMappingURL=dialog.service.js.map