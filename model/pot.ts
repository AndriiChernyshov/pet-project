import { FertilizationType } from './enums/fertilization-type'
import { WateringType } from './enums/watering-type'
import { PotStatus } from './pot-status'

import { WateringPotService } from '../service/watering-pot-service'
import { FertilizationPotService } from '../service/fertilizating-pot-service'

import * as moment from '../node_modules/moment/moment'

export class Pot {

    private id: number;
    private name: string;
    private fertilizationType: FertilizationType;
    private wateringType: WateringType;
    private potStatus: PotStatus;

    private wateringPotService: WateringPotService;
    private fertilizationPotService: FertilizationPotService;

    constructor(id: number, name: string, fertilizationType: FertilizationType, wateringType: WateringType) {
        this.id = id;
        this.name = name;
        this.fertilizationType = fertilizationType;
        this.wateringType = wateringType;
        this.potStatus = new PotStatus();

        this.wateringPotService = new WateringPotService();
        this.fertilizationPotService = new FertilizationPotService();
    }

    public GetId(): number {
        return this.id;
    }

    public GetName(): string {
        return this.name;
    }

    public GetPotStatus(): PotStatus {
        return this.potStatus;
    }

    public Log(): string{
        return `id: ${this.GetId()}, name: ${this.GetName()}, fertilizationType: ${FertilizationType[this.fertilizationType]}, wateringType: ${WateringType[this.wateringType]}, f.status: ${moment(this.GetPotStatus().fertilizationDate).format('Do MM YYYY, hh:mm:ss')}, w.status: ${moment(this.GetPotStatus().wateringDate).format('Do MM YYYY, hh:mm:ss')}`;
    }

    public Update(name: string, fertilizationType: FertilizationType, wateringType: WateringType){
        this.name = name;
        this.fertilizationType = fertilizationType;
        this.wateringType = wateringType;
    }

    public ResetStatus(){
        this.fertilizationPotService.ResetStatus(this);
        this.wateringPotService.ResetStatus(this);
    }

    public DoWatering(): void {
       this.wateringPotService.DoAction(this);
    }

    public DoFertilization() {
        this.fertilizationPotService.DoAction(this);
    }

    public IsReadyForWatering(): boolean {
        return this.wateringPotService.IsReadyForAction(this);
    }

    public IsReadyForFertilize(): boolean {
        return this.fertilizationPotService.IsReadyForAction(this);
    }
}