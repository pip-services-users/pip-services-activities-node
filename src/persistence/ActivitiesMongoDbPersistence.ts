let _ = require('lodash');
let async = require('async');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';

import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
import { IActivitiesPersistence } from './IActivitiesPersistence';
import { ActivitiesMongooseSchema } from './ActivitiesMongooseSchema';

export class ActivitiesMongoDbPersistence 
    extends IdentifiableMongoosePersistence<PartyActivityV1, string> implements IActivitiesPersistence {

    constructor() {
        super('party_activities', ActivitiesMongooseSchema());
    }
        
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ type: { $regex: searchRegex } });
            searchCriteria.push({ 'party.name': { $regex: searchRegex } });
            searchCriteria.push({ 'ref_item.name': { $regex: searchRegex } });
            searchCriteria.push({ 'ref_party.name': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id') || filter.getAsNullableString('activity_id');
        if (id != null)
            criteria.push({ _id: id });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        // Decode include types
        let includeTypes = filter.getAsObject('include_types');
        if (includeTypes) {
            if (!_.isArray(includeTypes)) 
                includeTypes = ('' + includeTypes).split(',');
            criteria.push({ type: { $in: includeTypes } });
        }

        // Decode exclude types
        let excludeTypes = filter.getAsObject('exclude_types');
        if (excludeTypes) {
            if (!_.isArray(excludeTypes)) 
                excludeTypes = ('' + excludeTypes).split(',');
            criteria.push({ type: { $nin: excludeTypes } });
        }

        // Decode party_id
        let partyId = filter.getAsNullableString('party_id');
        if (partyId) 
            criteria.push({ 'party.id': partyId });

        // Decode ref_item_id
        let refItemId = filter.getAsNullableString('ref_item_id');
        if (refItemId) 
            criteria.push({ 'ref_item.id': refItemId });

        // Decode ref_parent_id and ref_item_id
        let refParentId = filter.getAsNullableString('ref_parent_id');
        if (refParentId) 
            criteria.push({ 'ref_parents.id': refParentId });

        // Decode party
        let refPartyId = filter.getAsNullableString('ref_party_id');
        if (refPartyId) 
            criteria.push({ 'ref_party.id': refPartyId });

        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PartyActivityV1>) => void) {
        let criteria = this.composeFilter(filter);
        super.getPageByFilter(correlationId, criteria, paging, '-time', { parent_ids: 0 }, callback);
    }

    public create(correlationId: string, item: PartyActivityV1, callback: (err: any, item: PartyActivityV1) => void): void {
        item.ref_parents = item.ref_parents || [];
        if (item.ref_item)
            item.ref_parents.push(item.ref_item);
        super.create(correlationId, item, callback);
    }

    public deleteByFilter(correlationId: string, filter: FilterParams,
        callback: (err: any) => void) {

        let criteria = this.composeFilter(filter);

        this._model.remove(
            criteria,
            { multi: true },
            (err) => { callback(err); }
        );
    }
}