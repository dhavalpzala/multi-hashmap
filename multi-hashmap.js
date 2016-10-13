(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MultiHashMap = (function () {
        function MultiHashMap() {
            this._noOfDimensions = 0;
            this._dimensions = [];
            this._records = [];
            this._indexMaps = [];
            if (arguments.length === 0) {
                throw new Error('Please provide atleast one dimesion');
            }
            else {
                var firstArg = arguments[0];
                if (typeof firstArg === 'string') {
                    for (var index = 0; index < arguments.length; index++) {
                        this._indexMaps.push({
                            key: arguments[index],
                            map: Object.create(null)
                        });
                        this._dimensions.push(arguments[index]);
                    }
                    this._noOfDimensions = this._dimensions.length;
                }
                else if (typeof firstArg === 'object') {
                    for (var index = 0; index < firstArg.length; index++) {
                        this._indexMaps.push({
                            key: firstArg[index],
                            map: Object.create(null)
                        });
                        this._dimensions.push(firstArg[index]);
                    }
                    this._noOfDimensions = this._dimensions.length + (typeof arguments[1] === 'object' ? arguments[1].length : 0);
                }
            }
        }
        MultiHashMap.prototype.insert = function () {
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
                    item[index] = key;
                    if (index < this._dimensions.length) {
                        var hashMap = this._indexMaps[index].map;
                        if (hashMap) {
                            hashMap[key] = hashMap[key] || [];
                            hashMap[key].push(item);
                        }
                    }
                }
            }
            if (item.length > 0) {
                this._records.push(item);
            }
        };
        MultiHashMap.prototype.find = function (dimension, value) {
            var results = this.findAll(dimension, value);
            return results && results.length > 0 ? results[0] : null;
        };
        MultiHashMap.prototype.findAll = function (dimension, value) {
            var index = this._dimensions.indexOf(dimension);
            if (index === -1) {
                throw new Error('Invalid dimension');
            }
            var hashMap = this._indexMaps[index].map;
            if (hashMap && hashMap[value] && hashMap[value].length > 0) {
                return hashMap[value];
            }
            else {
                return null;
            }
        };
        /**
         * Returns all the records in the MultiHashMap.
         *
         * @returns An array of all the records.
         * @memberOf MultiHashMap
         */
        MultiHashMap.prototype.getAll = function () {
            return this._records;
        };
        MultiHashMap.prototype.remove = function (record) {
            var _this = this;
            if (record && record.length !== this._dimensions.length) {
                throw new Error('Invalid Record');
            }
            var records = this._records.filter(function (recordItem) {
                return recordItem.every(function (element, index) { return element === record[index]; });
            });
            // remove record with their mapping
            records.forEach(function (recordItem) {
                _this._dimensions.forEach(function (dimesion, index) {
                    var hashMap = _this._indexMaps[index].map, value = recordItem[index];
                    if (hashMap && hashMap[value] && hashMap[value].length > 0) {
                        var itemIndex = hashMap[value].indexOf(recordItem);
                        if (itemIndex > -1) {
                            hashMap[value].splice(itemIndex, 1);
                        }
                    }
                });
                var recordIndex = _this._records.indexOf(recordItem);
                if (recordIndex > -1) {
                    _this._records.splice(recordIndex, 1);
                }
            });
        };
        return MultiHashMap;
    }());
    exports.MultiHashMap = MultiHashMap;
});
