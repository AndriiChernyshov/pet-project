(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../model/enums/watering-type", "../node_modules/moment/moment"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var watering_type_1 = require("../model/enums/watering-type");
    var moment = require("../node_modules/moment/moment");
    var WateringPotService = /** @class */ (function () {
        function WateringPotService() {
        }
        WateringPotService.prototype.IsReadyForAction = function (pot) {
            var potStatus = pot.GetPotStatus();
            if (potStatus === null || potStatus.wateringDate === null || potStatus.wateringDate === undefined)
                return true;
            if (watering_type_1.WateringType.Day && moment(potStatus.wateringDate).startOf('day') < moment(new Date()).startOf('day'))
                return true;
            if (watering_type_1.WateringType.Week && (moment(potStatus.wateringDate).add(7, 'days')).startOf('day') < moment(new Date()).startOf('day'))
                return true;
            if (watering_type_1.WateringType.Month && (moment(potStatus.wateringDate).add(30, 'days')).startOf('day') < moment(new Date()).startOf('day'))
                return true;
            return false;
        };
        WateringPotService.prototype.DoAction = function (pot) {
            if (this.IsReadyForAction(pot)) {
                pot.GetPotStatus().wateringDate = new Date();
            }
            else
                console.log('Plant ' + pot.GetName() + ' is not ready for watering');
        };
        WateringPotService.prototype.ResetStatus = function (pot) {
            pot.GetPotStatus().wateringDate = undefined;
        };
        WateringPotService.prototype.EmulateHistoricalAction = function (pot, actionDate) {
            pot.GetPotStatus().wateringDate = actionDate;
        };
        return WateringPotService;
    }());
    exports.WateringPotService = WateringPotService;
});
