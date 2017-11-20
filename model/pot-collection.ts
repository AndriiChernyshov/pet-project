import { Pot } from './pot'


export class PotCollection {
    pots: Array<Pot>;

    constructor() {

    }

    public Add(pot: Pot) {
        this.pots.push(pot);
    }

    public FindPotById(id: number) : {isFound: boolean, pot?:Pot}{

        let pot = this.pots.find(pot => pot.GetId() === id);
        if(pot)
            return {isFound: true, pot};
        
        console.log(`Pot with id: ${id} doesn't exist`);
        return {isFound: false};
    }

    public FindPotByName(name: string) : Array<Pot>{
        return this.pots.filter( pot => pot.GetName() === name);
    }

    public ListAll() {
        this.pots.forEach(pot => {
            console.log(pot.Log());
        });
    }

    public ListToWatering() {
        this.pots.forEach(pot => {
            if (pot.IsReadyForWatering())
                console.log(pot.Log())
        });
    }

    public ListToFerilize() {
        this.pots.forEach(pot => {
            if (pot.IsReadyForFertilize())
                console.log(pot.Log())
        });
    }

    public Watering(id: number) {
        let searchResult = this.FindPotById(id);
        if(searchResult.isFound && searchResult.pot)
            searchResult.pot.DoWatering();
    }

    public WateringAll() {
        this.pots.forEach(pot => {
            pot.DoWatering();
        });
    }

    public Fertilize(id: number) {
        let searchResult = this.FindPotById(id);
        if(searchResult.isFound && searchResult.pot)
            searchResult.pot.DoFertilization();
    }

    public FertilizeAll() {
        this.pots.forEach(pot => {
            pot.DoFertilization();
        });
    }
}

