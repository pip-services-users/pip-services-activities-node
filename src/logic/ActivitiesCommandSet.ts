import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { IActivitiesBusinessLogic } from './IActivitiesBusinessLogic';

export class ActivitiesCommandSet extends CommandSet {
    private _logic: IActivitiesBusinessLogic;

    constructor(logic: IActivitiesBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetPartyActivitiesCommand());
		this.addCommand(this.makeLogPartyActivityCommand());
		this.addCommand(this.makeBatchPartyActivitiesCommand());
		this.addCommand(this.makeDeletePartyActivitiesCommand());
    }

	private makeGetPartyActivitiesCommand(): ICommand {
		return new Command(
			"get_party_activities",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getPartyActivities(correlationId, filter, paging, callback);
            }
		);
	}

	private makeLogPartyActivityCommand(): ICommand {
		return new Command(
			"log_party_activity",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let activity = args.get("activity");
                this._logic.logPartyActivity(correlationId, activity, callback);
            }
		);
	}

	private makeBatchPartyActivitiesCommand(): ICommand {
		return new Command(
			"batch_party_activities",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let activities = args.getAsArray("activities");
                this._logic.batchPartyActivities(correlationId, activities, (err) => {
					if (callback) callback(err, null)
				});
            }
		);
	}

	private makeDeletePartyActivitiesCommand(): ICommand {
		return new Command(
			"delete_party_activities",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.deletePartyActivities(correlationId, filter, (err) => {
					if (callback) callback(err, null)
				});
            }
		);
	}

}