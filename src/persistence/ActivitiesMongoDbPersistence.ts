let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { IActivitiesPersistence } from './IActivitiesPersistence';

export class ActivitiesMongoDbPersistence extends MongoDbPersistence implements IActivitiesPersistence {
	/**
	 * Unique descriptor for the ActivitiesMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-activities", "mongodb", "*"
	);

    constructor() {
        super(ActivitiesMongoDbPersistence.Descriptor, require('./PartyActivityModel'));
    }
        
    // Default callback if no callback was set
    // Todo: Perhaps that's not an issue with seneca. Reconsider later
    private defaultCallback(err) {
        if (err) this.error('Logging activity failed', err);
    }

    private getFilterCriteria(filter: any): any {
        let criteria = _.pick(filter, 'type');

        if (filter.id || filter.activity_id) 
            criteria._id = filter.id || filter.activity_id;

        // Decode include types
        if (filter.include_types) {
            let includeTypes = filter.include_types;
            if (!_.isArray(includeTypes)) 
                includeTypes = ('' + includeTypes).split(',');
            criteria.type = { $in: includeTypes };
        }

        // Decode exclude types
        if (filter.exclude_types) {
            let excludeTypes = filter.exclude_types;
            if (!_.isArray(excludeTypes)) 
                excludeTypes = ('' + excludeTypes).split(',');
            criteria.type = { $nin: excludeTypes };
        }

        // Decode start and end conditions
        if (filter.start || filter.end) {
            criteria.$and = criteria.$and || [];
            if (filter.start)
                criteria.$and.push({ time: { $gte: filter.start} });
            if (filter.end)
                criteria.$and.push({ time: { $lt: filter.end} });
        }

        // Decode ref_parent_id and ref_item_id
        if (filter.ref_parent_id) 
            criteria['ref_parents.id'] = filter.ref_parent_id;
        else if (filter.ref_item_id) 
            criteria['ref_parent.id'] = filter.ref_item_id;

        // Decode ref_item_id
        if (filter.ref_item_id) 
            criteria['ref_item.id'] = filter.ref_item_id;

        // Decode party_id
        if (filter.party_id) 
            criteria['party.id'] = filter.party_id;

        // Decode party
        if (filter.ref_party_id) 
            criteria['ref_party.id'] = filter.ref_party_id;

        return criteria;
    }

    // Todo: make filters more specific. For instance get activities by party, by ref, etc.
    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let criteria = this.getFilterCriteria(filter);
        this.getPage(criteria, paging, '-time', { parent_ids: 0 }, callback);
    }

    public logPartyActivity(correlationId: string, activity: any, callback: any) {
        activity = _.clone(activity);

        // Fill automatically generated fields
        activity._id = activity.id || this.createUuid();
        activity.time = new Date();

        // Ensure that ref_item is included into ref_parents
        if (activity.ref_item) {
            activity.ref_parents = activity.ref_parents || [];
            let found = _.find(activity.ref_parents, (ref) => {
                return ref.id === activity.ref_item.id;
            });

            if (found == null) {
                activity.ref_parents.push(activity.ref_item);
            }
        }

        // Set default callback
        callback = callback || this.defaultCallback;

        this.create(activity, callback);
    }

    // Deletes activities that satisfy specified filter
    // Todo: make filters more specific. For instance get activities by party, by entity, etc.
    public deletePartyActivities(correlationId: string, filter: FilterParams, callback: any) {
        let criteria = this.getFilterCriteria(filter);

        // Set default callback
        callback = callback || this.defaultCallback;

        this._model.remove(
            criteria,
            { multi: true },
            (err) => { callback(err); }
        );
    }
}