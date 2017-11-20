(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./enums/fertilization-type", "./enums/watering-type", "./pot-status", "../service/watering-pot-service", "../service/fertilizating-pot-service", "../node_modules/moment/moment"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fertilization_type_1 = require("./enums/fertilization-type");
    var watering_type_1 = require("./enums/watering-type");
    var pot_status_1 = require("./pot-status");
    var watering_pot_service_1 = require("../service/watering-pot-service");
    var fertilizating_pot_service_1 = require("../service/fertilizating-pot-service");
    var moment = require("../node_modules/moment/moment");
    var Pot = /** @class */ (function () {
        function Pot(id, name, fertilizationType, wateringType) {
            this.id = id;
            this.name = name;
            this.fertilizationType = fertilizationType;
            this.wateringType = wateringType;
            this.potStatus = new pot_status_1.PotStatus();
            this.wateringPotService = new watering_pot_service_1.WateringPotService();
            this.fertilizationPotService = new fertilizating_pot_service_1.FertilizationPotService();
        }
        Pot.prototype.GetId = function () {
            return this.id;
        };
        Pot.prototype.GetName = function () {
            return this.name;
        };
        Pot.prototype.GetPotStatus = function () {
            return this.potStatus;
        };
        Pot.prototype.Log = function () {
            return "id: " + this.GetId() + ", name: " + this.GetName() + ", fertilizationType: " + fertilization_type_1.FertilizationType[this.fertilizationType] + ", wateringType: " + watering_type_1.WateringType[this.wateringType] + ", f.status: " + moment(this.GetPotStatus().fertilizationDate).format('Do MM YYYY, hh:mm:ss') + ", w.status: " + moment(this.GetPotStatus().wateringDate).format('Do MM YYYY, hh:mm:ss');
        };
        Pot.prototype.Update = function (name, fertilizationType, wateringType) {
            this.name = name;
            this.fertilizationType = fertilizationType;
            this.wateringType = wateringType;
        };
        Pot.prototype.ResetStatus = function () {
            this.fertilizationPotService.ResetStatus(this);
            this.wateringPotService.ResetStatus(this);
        };
        Pot.prototype.DoWatering = function () {
            this.wateringPotService.DoAction(this);
        };
        Pot.prototype.DoFertilization = function () {
            this.fertilizationPotService.DoAction(this);
        };
        Pot.prototype.IsReadyForWatering = function () {
            return this.wateringPotService.IsReadyForAction(this);
        };
        Pot.prototype.IsReadyForFertilize = function () {
            return this.fertilizationPotService.IsReadyForAction(this);
        };
        return Pot;
    }());
    exports.Pot = Pot;
});
