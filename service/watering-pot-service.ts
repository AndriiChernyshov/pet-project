import { PotValidation } from './basic-pot-service'
import { WateringType } from '../model/enums/watering-type'
import { Pot } from '../model/pot'
import * as moment from '../node_modules/moment/moment'

export class WateringPotService implements PotValidation {
    
    IsReadyForAction(pot: Pot): boolean {

        let potStatus = pot.GetPotStatus();
        if (potStatus === null || potStatus.wateringDate === null || potStatus.wateringDate === undefined)
            return true;

        if (WateringType.Day && moment(potStatus.wateringDate).startOf('day') < moment(new Date()).startOf('day'))
            return true;

        if (WateringType.Week && (moment(potStatus.wateringDate).add(7, 'days')).startOf('day') < moment(new Date()).startOf('day'))
            return true;

        if (WateringType.Month && (moment(potStatus.wateringDate).add(30, 'days')).startOf('day') < moment(new Date()).startOf('day'))
            return true;

        return false;
    }

    DoAction(pot: Pot): void {
        if (this.IsReadyForAction(pot)) {
            pot.GetPotStatus().wateringDate = new Date();
        }
        else
            console.log('Plant ' + pot.GetName() + ' is not ready for watering')
    }

    ResetStatus(pot: Pot): void {
        pot.GetPotStatus().wateringDate = undefined;
    }

    EmulateHistoricalAction(pot: Pot, actionDate: Date): void{
        pot.GetPotStatus().wateringDate = actionDate;
    }

}