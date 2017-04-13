let _ = require('lodash');

import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';
import { DateTimeConverter } from 'pip-services-commons-node';

import { PartyActivityV1Schema } from '../data/version1/PartyActivityV1Schema';
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
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
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
			new ObjectSchema(true)
				.withRequiredProperty('activity', new PartyActivityV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let activity = args.get("activity");
				activity.time = DateTimeConverter.toNullableDateTime(activity.time);
                this._logic.logPartyActivity(correlationId, activity, callback);
            }
		);
	}

	private makeBatchPartyActivitiesCommand(): ICommand {
		return new Command(
			"batch_party_activities",
			new ObjectSchema(true)
				.withRequiredProperty('activities', new ArraySchema(new PartyActivityV1Schema())),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let activities = args.getAsArray("activities");
				_.each(activities, (a) => {
					a.time = DateTimeConverter.toNullableDateTime(a.time);
				});
                this._logic.batchPartyActivities(correlationId, activities, (err) => {
					if (callback) callback(err, null)
				});
            }
		);
	}

	private makeDeletePartyActivitiesCommand(): ICommand {
		return new Command(
			"delete_party_activities",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.deletePartyActivities(correlationId, filter, (err) => {
					if (callback) callback(err, null)
				});
            }
		);
	}

}