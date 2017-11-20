(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WateringType;
    (function (WateringType) {
        WateringType[WateringType["Day"] = 0] = "Day";
        WateringType[WateringType["Week"] = 1] = "Week";
        WateringType[WateringType["Month"] = 2] = "Month";
    })(WateringType = exports.WateringType || (exports.WateringType = {}));
});
