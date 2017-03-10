"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var async = require('async');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var ActivitiesMongoDbPersistence = (function (_super) {
    __extends(ActivitiesMongoDbPersistence, _super);
    function ActivitiesMongoDbPersistence() {
        _super.call(this, ActivitiesMongoDbPersistence.Descriptor, require('./PartyActivityModel'));
    }
    // Default callback if no callback was set
    // Todo: Perhaps that's not an issue with seneca. Reconsider later
    ActivitiesMongoDbPersistence.prototype.defaultCallback = function (err) {
        if (err)
            this.error('Logging activity failed', err);
    };
    ActivitiesMongoDbPersistence.prototype.getFilterCriteria = function (filter) {
        var criteria = _.pick(filter, 'type');
        if (filter.id || filter.activity_id)
            criteria._id = filter.id || filter.activity_id;
        // Decode include types
        if (filter.include_types) {
            var includeTypes = filter.include_types;
            if (!_.isArray(includeTypes))
                includeTypes = ('' + includeTypes).split(',');
            criteria.type = { $in: includeTypes };
        }
        // Decode exclude types
        if (filter.exclude_types) {
            var excludeTypes = filter.exclude_types;
            if (!_.isArray(excludeTypes))
                excludeTypes = ('' + excludeTypes).split(',');
            criteria.type = { $nin: excludeTypes };
        }
        // Decode start and end conditions
        if (filter.start || filter.end) {
            criteria.$and = criteria.$and || [];
            if (filter.start)
                criteria.$and.push({ time: { $gte: filter.start } });
            if (filter.end)
                criteria.$and.push({ time: { $lt: filter.end } });
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
    };
    // Todo: make filters more specific. For instance get activities by party, by ref, etc.
    ActivitiesMongoDbPersistence.prototype.getPartyActivities = function (correlationId, filter, paging, callback) {
        var criteria = this.getFilterCriteria(filter);
        this.getPage(criteria, paging, '-time', { parent_ids: 0 }, callback);
    };
    ActivitiesMongoDbPersistence.prototype.logPartyActivity = function (correlationId, activity, callback) {
        activity = _.clone(activity);
        // Fill automatically generated fields
        activity._id = activity.id || this.createUuid();
        activity.time = new Date();
        // Ensure that ref_item is included into ref_parents
        if (activity.ref_item) {
            activity.ref_parents = activity.ref_parents || [];
            var found = _.find(activity.ref_parents, function (ref) {
                return ref.id === activity.ref_item.id;
            });
            if (found == null) {
                activity.ref_parents.push(activity.ref_item);
            }
        }
        // Set default callback
        callback = callback || this.defaultCallback;
        this.create(activity, callback);
    };
    // Deletes activities that satisfy specified filter
    // Todo: make filters more specific. For instance get activities by party, by entity, etc.
    ActivitiesMongoDbPersistence.prototype.deletePartyActivities = function (correlationId, filter, callback) {
        var criteria = this.getFilterCriteria(filter);
        // Set default callback
        callback = callback || this.defaultCallback;
        this._model.remove(criteria, { multi: true }, function (err) { callback(err); });
    };
    /**
     * Unique descriptor for the ActivitiesMongoDbPersistence component
     */
    ActivitiesMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-activities", "mongodb", "*");
    return ActivitiesMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.ActivitiesMongoDbPersistence = ActivitiesMongoDbPersistence;
