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
    var PotCollection = /** @class */ (function () {
        function PotCollection() {
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
            this.pots.forEach(function (pot) {
                if (pot.IsReadyForWatering())
                    console.log(pot.Log());
            });
        };
        PotCollection.prototype.ListToFerilize = function () {
            this.pots.forEach(function (pot) {
                if (pot.IsReadyForFertilize())
                    console.log(pot.Log());
            });
        };
        PotCollection.prototype.Watering = function (id) {
            var searchResult = this.FindPotById(id);
            if (searchResult.isFound && searchResult.pot)
                searchResult.pot.DoWatering();
        };
        PotCollection.prototype.WateringAll = function () {
            this.pots.forEach(function (pot) {
                pot.DoWatering();
            });
        };
        PotCollection.prototype.Fertilize = function (id) {
            var searchResult = this.FindPotById(id);
            if (searchResult.isFound && searchResult.pot)
                searchResult.pot.DoFertilization();
        };
        PotCollection.prototype.FertilizeAll = function () {
            this.pots.forEach(function (pot) {
                pot.DoFertilization();
            });
        };
        return PotCollection;
    }());
    exports.PotCollection = PotCollection;
});
