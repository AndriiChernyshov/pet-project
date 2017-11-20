import { FertilizationType } from './enums/fertilization-type'
import { WateringType } from './enums/watering-type'
import { PotStatus } from './pot-status'

import * as moment from '../node_modules/moment/moment'

export class Pot {

    private id: number;
    private name: string;
    private fertilizationType: FertilizationType;
    private wateringType: WateringType;
    private potStatus: PotStatus;

    constructor(id: number, name: string, fertilizationType: FertilizationType, wateringType: WateringType) {
        this.id = id;
        this.name = name;
        this.fertilizationType = fertilizationType;
        this.wateringType = wateringType;
        this.potStatus = new PotStatus();
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
}