(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../model/enums/fertilization-type", "../node_modules/moment/moment"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fertilization_type_1 = require("../model/enums/fertilization-type");
    var moment = require("../node_modules/moment/moment");
    var FertilizationPotService = /** @class */ (function () {
        function FertilizationPotService() {
        }
        FertilizationPotService.prototype.IsReadyForAction = function (pot) {
            var potStatus = pot.GetPotStatus();
            if (potStatus === null || potStatus.fertilizationDate === null || potStatus.fertilizationDate === undefined)
                return true;
            if (fertilization_type_1.FertilizationType.Day && moment(potStatus.fertilizationDate).startOf('day') < moment(new Date()).startOf('day'))
                return true;
            if (fertilization_type_1.FertilizationType.Week && (moment(potStatus.fertilizationDate).add(7, 'days')).startOf('day') < moment(new Date()).startOf('day'))
                return true;
            if (fertilization_type_1.FertilizationType.Month && (moment(potStatus.fertilizationDate).add(30, 'days')).startOf('day') < moment(new Date()).startOf('day'))
                return true;
            return false;
        };
        FertilizationPotService.prototype.DoAction = function (pot) {
            if (this.IsReadyForAction(pot)) {
                pot.GetPotStatus().fertilizationDate = new Date();
            }
            else
                console.log('Plant ' + pot.GetName() + ' is not ready for fertilization');
        };
        FertilizationPotService.prototype.ResetStatus = function (pot) {
            pot.GetPotStatus().fertilizationDate = undefined;
        };
        FertilizationPotService.prototype.EmulateHistoricalAction = function (pot, actionDate) {
            pot.GetPotStatus().fertilizationDate = actionDate;
        };
        return FertilizationPotService;
    }());
    exports.FertilizationPotService = FertilizationPotService;
});
