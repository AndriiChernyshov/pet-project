import { Pot } from './pot'
import { WateringPotService } from '../service/watering-pot-service'
import { FertilizationPotService } from '../service/fertilizating-pot-service'

export class PotCollection {
    pots: Array<Pot>;
    private wateringPotService: WateringPotService;
    private fertilizationPotService: FertilizationPotService;

    constructor() {
        this.wateringPotService = new WateringPotService();
        this.fertilizationPotService = new FertilizationPotService();
    }

    public Add(pot: Pot) {
        this.pots.push(pot);
    }

    public FindPotById(id: number): { isFound: boolean, pot?: Pot } {

        let pot = this.pots.find(pot => pot.GetId() === id);
        if (pot)
            return { isFound: true, pot };

        console.log(`Pot with id: ${id} doesn't exist`);
        return { isFound: false };
    }

    public FindPotByName(name: string): Array<Pot> {
        return this.pots.filter(pot => pot.GetName() === name);
    }

    public ListAll() {
        this.pots.forEach(pot => {
            console.log(pot.Log());
        });
    }

    public ListToWatering() {
        this.pots.forEach(pot => {
            if (this.wateringPotService.IsReadyForAction(pot))
                console.log(pot.Log())
        });
    }

    public ListToFerilize() {
        this.pots.forEach(pot => {
            if (this.fertilizationPotService.IsReadyForAction(pot))
                console.log(pot.Log())
        });
    }

    public Watering(id: number) {
        let searchResult = this.FindPotById(id);
        if (searchResult.isFound && searchResult.pot) {
            this.wateringPotService.DoAction(searchResult.pot);
        }
    }

    public WateringAll() {
        this.pots.forEach(pot => {
            this.wateringPotService.DoAction(pot);
        });
    }

    public Fertilize(id: number) {
        let searchResult = this.FindPotById(id);
        if (searchResult.isFound && searchResult.pot) {
            this.fertilizationPotService.DoAction(searchResult.pot);
        }
    }

    public FertilizeAll() {
        this.pots.forEach(pot => {
            this.fertilizationPotService.DoAction(pot);
        });
    }

    public ResetStatus(id: number) {
        let searchResult = this.FindPotById(id);
        if (searchResult.isFound && searchResult.pot) {
            this.fertilizationPotService.ResetStatus(searchResult.pot);
            this.wateringPotService.ResetStatus(searchResult.pot);
        }
    }

    public EmulateWatering(id: number, desiredDate: Date): void {
        let searchResult = this.FindPotById(id);
        if (searchResult.isFound && searchResult.pot) {
            this.wateringPotService.EmulateHistoricalAction(searchResult.pot, desiredDate);
        }
    }
}

