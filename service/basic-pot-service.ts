import {Pot} from '../model/pot'

export interface PotValidation{
    IsReadyForAction(pot: Pot):boolean;
    DoAction(pot: Pot): void;
    ResetStatus(pot: Pot):void;

    EmulateHistoricalAction(pot: Pot, actionDate: Date):void;

}