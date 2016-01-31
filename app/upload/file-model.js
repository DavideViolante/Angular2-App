System.register([], function(exports_1) {
    var File;
    return {
        setters:[],
        execute: function() {
            File = (function () {
                function File(id, author, 
                    //public dls: number,
                    //public imgurl: Array<string>,
                    name, cat) {
                    this.id = id;
                    this.author = author;
                    this.name = name;
                    this.cat = cat;
                }
                return File;
            })();
            exports_1("File", File);
        }
    }
});
//# sourceMappingURL=file-model.js.map