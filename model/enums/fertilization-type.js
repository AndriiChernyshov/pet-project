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
    var FertilizationType;
    (function (FertilizationType) {
        FertilizationType[FertilizationType["Day"] = 0] = "Day";
        FertilizationType[FertilizationType["Week"] = 1] = "Week";
        FertilizationType[FertilizationType["Month"] = 2] = "Month";
    })(FertilizationType = exports.FertilizationType || (exports.FertilizationType = {}));
});
