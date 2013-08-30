if (!String.prototype.trim) {
    String.prototype.trim = function() {
        console.log(90);
        return this.replace(/^\s+|\s+$/g, '');
    };

    String.prototype.ltrim = function() {
        return this.replace(/^\s+/,'');
    };

    String.prototype.rtrim = function() {
        return this.replace(/\s+$/,'');
    };

    String.prototype.fulltrim = function() {
        return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
    };

    console.log(23);
}

// module.exports.stringUtil = String.prototype;