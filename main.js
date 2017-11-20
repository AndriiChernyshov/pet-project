(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./model/pot", "./model/pot-collection", "./model/enums/fertilization-type", "./model/enums/watering-type"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pot_1 = require("./model/pot");
    var pot_collection_1 = require("./model/pot-collection");
    var fertilization_type_1 = require("./model/enums/fertilization-type");
    var watering_type_1 = require("./model/enums/watering-type");
    var Main = /** @class */ (function () {
        function Main() {
            this.potCollection = new pot_collection_1.PotCollection();
            this.potCollection.pots = new Array();
            this.potCollection.Add(new pot_1.Pot(1, "Daisy", fertilization_type_1.FertilizationType.Month, watering_type_1.WateringType.Day));
            this.potCollection.Add(new pot_1.Pot(2, "Cactus", fertilization_type_1.FertilizationType.Month, watering_type_1.WateringType.Month));
            this.potCollection.Add(new pot_1.Pot(3, "Spruce", fertilization_type_1.FertilizationType.Month, watering_type_1.WateringType.Week));
        }
        Main.prototype.Start = function () {
            console.log('All possible pots:');
            this.potCollection.ListAll();
            console.log('Pots to be watering');
            this.potCollection.ListToWatering();
            console.log('Lets water first pot');
            this.potCollection.Watering(1);
            console.log('And now: Pots to be watering');
            this.potCollection.ListToWatering();
            console.log('Lets simulate that #2 was watered ');
            this.potCollection.EmulateWatering(2, new Date());
            console.log('Pots to be watering');
            this.potCollection.ListToWatering();
            console.log('Lets water them all');
            this.potCollection.WateringAll();
            this.potCollection.ListToWatering();
            console.log('All possible pots:');
            this.potCollection.ListAll();
        };
        return Main;
    }());
    var test = new Main();
    test.Start();
});
