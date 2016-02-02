System.register([], function(exports_1) {
    "use strict";
    var File;
    return {
        setters:[],
        execute: function() {
            File = (function () {
                function File(id, author, imgurl, name, cat) {
                    //private dls: number,
                    this.imgurl = [];
                    this.id = id;
                    this.author = author;
                    this.imgurl = imgurl;
                    this.name = name;
                    this.cat = cat;
                }
                File.prototype.getID = function () { return this.id; };
                File.prototype.setID = function (id) { this.id = id; };
                File.prototype.getAuthor = function () { return this.author; };
                File.prototype.setAuthor = function (author) { this.author = author; };
                File.prototype.addImgUrl = function (url) {
                    this.imgurl.push(url);
                };
                File.prototype.getName = function () { return this.name; };
                File.prototype.setName = function (name) { this.name = name; };
                File.prototype.getCat = function () { return this.cat; };
                File.prototype.setCat = function (cat) { this.cat = cat; };
                return File;
            }());
            exports_1("File", File);
        }
    }
});
//# sourceMappingURL=file-model.js.map