import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

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
			this._logic,
			"get_party_activities",
			new Schema()
				.withProperty("filter", "FilterParams")
                .withProperty("paging", "PagingParams"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("filter"));
                this._logic.getPartyActivities(correlationId, filter, paging, callback);
            }
		);
	}

	private makeLogPartyActivityCommand(): ICommand {
		return new Command(
			this._logic,
			"log_party_activity",
			new Schema()
				.withProperty("activity", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let activity = args.get("activity");
                this._logic.logPartyActivity(correlationId, activity, callback);
            }
		);
	}

	private makeBatchPartyActivitiesCommand(): ICommand {
		return new Command(
			this._logic,
			"batch_party_activities",
			new Schema()
				.withArray("activities", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let activities = args.getArray("activities");
                this._logic.batchPartyActivities(correlationId, activities, callback);
            }
		);
	}

	private makeDeletePartyActivitiesCommand(): ICommand {
		return new Command(
			this._logic,
			"delete_party_activities",
			new Schema()
				.withProperty("filter", "FilterParams"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.deletePartyActivities(correlationId, filter, callback);
            }
		);
	}

}