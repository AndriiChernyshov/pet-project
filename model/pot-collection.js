(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../service/watering-pot-service", "../service/fertilizating-pot-service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var watering_pot_service_1 = require("../service/watering-pot-service");
    var fertilizating_pot_service_1 = require("../service/fertilizating-pot-service");
    var PotCollection = /** @class */ (function () {
        function PotCollection() {
            this.wateringPotService = new watering_pot_service_1.WateringPotService();
            this.fertilizationPotService = new fertilizating_pot_service_1.FertilizationPotService();
        }
        PotCollection.prototype.Add = function (pot) {
            this.pots.push(pot);
        };
        PotCollection.prototype.FindPotById = function (id) {
            var pot = this.pots.find(function (pot) { return pot.GetId() === id; });
            if (pot)
                return { isFound: true, pot: pot };
            console.log("Pot with id: " + id + " doesn't exist");
            return { isFound: false };
        };
        PotCollection.prototype.FindPotByName = function (name) {
            return this.pots.filter(function (pot) { return pot.GetName() === name; });
        };
        PotCollection.prototype.ListAll = function () {
            this.pots.forEach(function (pot) {
                console.log(pot.Log());
            });
        };
        PotCollection.prototype.ListToWatering = function () {
            var _this = this;
            this.pots.forEach(function (pot) {
                if (_this.wateringPotService.IsReadyForAction(pot))
                    console.log(pot.Log());
            });
        };
        PotCollection.prototype.ListToFerilize = function () {
            var _this = this;
            this.pots.forEach(function (pot) {
                if (_this.fertilizationPotService.IsReadyForAction(pot))
                    console.log(pot.Log());
            });
        };
        PotCollection.prototype.Watering = function (id) {
            var searchResult = this.FindPotById(id);
            if (searchResult.isFound && searchResult.pot) {
                this.wateringPotService.DoAction(searchResult.pot);
            }
        };
        PotCollection.prototype.WateringAll = function () {
            var _this = this;
            this.pots.forEach(function (pot) {
                _this.wateringPotService.DoAction(pot);
            });
        };
        PotCollection.prototype.Fertilize = function (id) {
            var searchResult = this.FindPotById(id);
            if (searchResult.isFound && searchResult.pot) {
                this.fertilizationPotService.DoAction(searchResult.pot);
            }
        };
        PotCollection.prototype.FertilizeAll = function () {
            var _this = this;
            this.pots.forEach(function (pot) {
                _this.fertilizationPotService.DoAction(pot);
            });
        };
        PotCollection.prototype.ResetStatus = function (id) {
            var searchResult = this.FindPotById(id);
            if (searchResult.isFound && searchResult.pot) {
                this.fertilizationPotService.ResetStatus(searchResult.pot);
                this.wateringPotService.ResetStatus(searchResult.pot);
            }
        };
        PotCollection.prototype.EmulateWatering = function (id, desiredDate) {
            var searchResult = this.FindPotById(id);
            if (searchResult.isFound && searchResult.pot) {
                this.wateringPotService.EmulateHistoricalAction(searchResult.pot, desiredDate);
            }
        };
        return PotCollection;
    }());
    exports.PotCollection = PotCollection;
});
