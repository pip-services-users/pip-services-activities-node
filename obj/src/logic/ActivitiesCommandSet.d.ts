import { CommandSet } from 'pip-services-commons-node';
import { IActivitiesBusinessLogic } from './IActivitiesBusinessLogic';
export declare class ActivitiesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IActivitiesBusinessLogic);
    private makeGetPartyActivitiesCommand();
    private makeLogPartyActivityCommand();
    private makeBatchPartyActivitiesCommand();
    private makeDeletePartyActivitiesCommand();
}
