System.register([], function(exports_1) {
    "use strict";
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, username, password, role) {
                    this.id = id;
                    this.username = username;
                    this.password = password;
                    this.role = role;
                }
                User.prototype.getID = function () { return this.id; };
                User.prototype.setID = function (id) { this.id = id; };
                User.prototype.getUsername = function () { return this.username; };
                User.prototype.setUsername = function (username) { this.username = username; };
                User.prototype.getPassword = function () { return this.password; };
                User.prototype.setPassword = function (password) { this.password = password; };
                User.prototype.getRole = function () { return this.role; };
                User.prototype.setRole = function (role) { this.role = role; };
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user-model.js.map