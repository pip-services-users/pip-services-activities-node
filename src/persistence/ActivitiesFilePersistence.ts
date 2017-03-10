let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { IActivitiesPersistence } from './IActivitiesPersistence';

export class ActivitiesFilePersistence extends FilePersistence implements IActivitiesPersistence {
	/**
	 * Unique descriptor for the ActivitiesFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-activities", "file", "*"
	);

    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || ActivitiesFilePersistence.Descriptor);
    }

    private equalIds(ref: any, id: string) {
        return (ref != null) ? ref.id == id : false;
    }

    private includeId(refArray: any, id: string) {
        if (refArray == null) return false;
        for (var i = 0; i < refArray.length; i++) {
            let ref = refArray[i];
            if (ref && ref.id == id) return true;
        }
        return false;
    }
    
    private getReference(value: any) {
        return _.pick(value, 'id', 'type', 'name');
    }
    
    private filterActivity(filter: any) {
        let id = filter.id || filter.activity_id;
        let type = filter.type;
        let include_types = filter.include_types;
        let exclude_types = filter.exclude_types;
        let party_id = filter.party_id;
        let ref_parent_id = filter.ref_parent_id;
        let ref_party_id = filter.ref_party_id;
        let ref_item_id = filter.ref_item_id;

        // Convert string parameters to arrays
        if (include_types && !_.isArray(include_types))
            include_types = ('' + include_types).split(',');
        if (exclude_types && !_.isArray(exclude_types))
            exclude_types = ('' + exclude_types).split(',');

        // Todo: Convert to date/time
        let start = filter.start;
        let end = filter.end;
        
        return (item) => {
            // Decode start and end conditions
            if (start && item.time < start) 
                return false;
            if (end && item.time >= end) 
                return false;

            if (id && item.id != id) 
                return false;
            if (type && item.type != type) 
                return false;

            if (include_types && !_.include(include_types, item.id))
                return false;                
            if (exclude_types && _.include(exclude_types, item.id))
                return false;                

            if (ref_parent_id && !this.includeId(item.ref_parents, ref_parent_id)) 
                return false;
            if (ref_item_id && !this.includeId(item.ref_parents, ref_item_id)) 
                return false;

            if (party_id && !this.equalIds(item.party, party_id)) 
                return false;

            if (ref_party_id && !this.equalIds(item.ref_party, ref_party_id)) 
                return false;
            if (ref_item_id && !this.equalIds(item.ref_item, ref_item_id)) 
                return false;

            return true;
        }
    }
    
    // Gets activities by specific criteria
    public getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterFunc = this.filterActivity(filter);
        this.getPage(filterFunc, paging, null, null, callback);
    }

    // Logs party activity
    public logPartyActivity(correlationId: string, activity: any, callback: any) {
        activity = _.pick(activity, 'id', 'time', 'type', 'party', 
            'ref_item', 'ref_parents', 'ref_party', 'details'
        );

        // Ensure proper references        
        if (activity.party)
            activity.party = this.getReference(activity.party);
        if (activity.ref_item)
            activity.ref_item = this.getReference(activity.ref_item);
        if (activity.ref_parents)
            activity.ref_parents = _.map(
                activity.ref_parents, 
                (ref) => { return this.getReference(ref); }
            );
        if (activity.ref_party)
            activity.ref_party = this.getReference(activity.ref_party);
            
        // Fill automatically generated fields
        activity.id = activity.id || this.createUuid();
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

        this.create(activity, callback);
    }

    // Deletes activities that satisfy specified filter
    public deletePartyActivities(correlationId: string, filter: FilterParams, callback: any) {
        let filterFunc = this.filterActivity(filter);
        let deletedItems = _.remove(this._items, filterFunc);

       // Exit if nothing was deleted
        if (deletedItems == null && deletedItems.length == 0) {
            callback(null, null);
            return;
        }
                        
        // Save item collection
        this.save((err) => {
            if (err) callback(err);
            else callback(null, deletedItems[0]);
        });
    }
}
