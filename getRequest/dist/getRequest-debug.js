define("tanshenghu/getRequest/1.0.0/getRequest-debug", [], function(require, exports, module) {
    var getRequest = function() {
        var result = {}, url = arguments[0] + "", searchstr = url ? url.substring(url.indexOf("?")) : document.location.search;
        searchstr = searchstr.substring(1);
        var arr = searchstr.split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var itemarr = arr[i].split("=");
            result[itemarr[0]] = itemarr[1];
        }
        return result;
    };
    module.exports = getRequest;
});
