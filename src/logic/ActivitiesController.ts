let async = require('async');

import { DynamicMap } from 'pip-services-runtime-node';
import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';

import { IActivitiesPersistence } from '../persistence/IActivitiesPersistence';
import { IActivitiesBusinessLogic } from './IActivitiesBusinessLogic';
import { ActivitiesCommandSet } from './ActivitiesCommandSet';

export class ActivitiesController extends AbstractController implements IActivitiesBusinessLogic {
	/**
	 * Unique descriptor for the ActivitiesController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-activities", "*", "*"
	);
    
	private _db: IActivitiesPersistence;
    
    constructor() {
        super(ActivitiesController.Descriptor);
    }

    public link(components: ComponentSet): void {
        // Locate reference to tags persistence component
        this._db = <IActivitiesPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-activities", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new ActivitiesCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback) {
        callback = this.instrument(correlationId, 'activities.get_party_activities', callback);
        this._db.getPartyActivities(correlationId, filter, paging, callback);
    }
        
    public logPartyActivity(correlationId: string, activity: any, callback) {
        callback = this.instrument(correlationId, 'activities.log_party_activity', callback);
        this._db.logPartyActivity(correlationId, activity, callback);
    }
    
    public batchPartyActivities(correlationId: string, activities: any[], callback) {
        callback = this.instrument(correlationId, 'activities.batch_party_activities', callback);
    
        async.each(
            activities,
            (activity, callback) => {
                this._db.logPartyActivity(correlationId, activity, callback );
            },
            (err) => { 
                if (callback) callback(err); 
            }
        );
    }

    public deletePartyActivities(correlationId: string, filter: FilterParams, callback) {
        callback = this.instrument(correlationId, 'activities.delete_party_activities', callback);
        this._db.deletePartyActivities(correlationId, filter, callback);
    }
}
