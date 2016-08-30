var MultiHashMap = (function () {
    function MultiHashMap() {
        var dimensions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dimensions[_i - 0] = arguments[_i];
        }
        this._noOfDimensions = 0;
        this._records = [];
        this._indexMaps = [];
        for (var index = 0; index < dimensions.length; index++) {
            this._indexMaps.push({
                key: dimensions[index],
                map: Object.create(null)
            });
        }
        this._dimensions = dimensions;
        this._noOfDimensions = this._dimensions.length;
    }
    MultiHashMap.prototype.add = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i - 0] = arguments[_i];
        }
        if (params.length > this._noOfDimensions) {
            throw new Error('Extra arguments are passed');
        }
        var item = [];
        for (var index = 0; index < params.length; index++) {
            var key = params[index];
            if (key) {
                var hashMap = this._indexMaps[index].map;
                if (hashMap) {
                    item[index] = key;
                    hashMap[key] = item;
                }
            }
        }
        if (item.length > 0) {
            this._records.push(item);
        }
    };
    MultiHashMap.prototype.find = function (dimension, value) {
        var index = this._dimensions.indexOf(dimension);
        if (index === -1) {
            throw new Error('Incorrect dimension');
        }
        var hashMap = this._indexMaps[index].map;
        if (hashMap && hashMap[value]) {
            return hashMap[value];
        }
        return [];
    };
    MultiHashMap.prototype.hasContains = function (hashMap, key) {
    };
    return MultiHashMap;
}());
