import { CommandSet } from 'pip-services-commons-node';
import { IActivitiesController } from './IActivitiesController';
export declare class ActivitiesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IActivitiesController);
    private makeGetPartyActivitiesCommand();
    private makeLogPartyActivityCommand();
    private makeBatchPartyActivitiesCommand();
    private makeDeletePartyActivitiesCommand();
}
