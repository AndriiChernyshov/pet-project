import {Pot} from './model/pot'
import {PotCollection} from './model/pot-collection'
import {FertilizationType} from './model/enums/fertilization-type'
import {WateringType} from './model/enums/watering-type'
import {PotStatus} from './model/pot-status'

class Main{
    potCollection: PotCollection;

    constructor()
    {
        this.potCollection = new PotCollection();
        this.potCollection.pots = new Array<Pot>();

        this.potCollection.Add(new Pot(1, "Daisy", FertilizationType.Month, WateringType.Day))
        this.potCollection.Add(new Pot(2, "Cactus", FertilizationType.Month, WateringType.Month))
        this.potCollection.Add(new Pot(3, "Spruce", FertilizationType.Month, WateringType.Week))
    }

    public Start(){
        console.log('All possible pots:');
        this.potCollection.ListAll();

        console.log('Pots to be watering');
        this.potCollection.ListToWatering();

        
        console.log('Lets water first pot');
        this.potCollection.Watering(1);

        console.log('And now: Pots to be watering');
        this.potCollection.ListToWatering();

        console.log('Lets water them all');
        this.potCollection.WateringAll();
        this.potCollection.ListToWatering();

        console.log('All possible pots:');
        this.potCollection.ListAll();
    }
}

const test = new Main();
test.Start()