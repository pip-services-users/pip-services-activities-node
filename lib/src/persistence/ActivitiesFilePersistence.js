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
var ActivitiesFilePersistence = (function (_super) {
    __extends(ActivitiesFilePersistence, _super);
    function ActivitiesFilePersistence(descriptor) {
        _super.call(this, descriptor || ActivitiesFilePersistence.Descriptor);
    }
    ActivitiesFilePersistence.prototype.equalIds = function (ref, id) {
        return (ref != null) ? ref.id == id : false;
    };
    ActivitiesFilePersistence.prototype.includeId = function (refArray, id) {
        if (refArray == null)
            return false;
        for (var i = 0; i < refArray.length; i++) {
            var ref = refArray[i];
            if (ref && ref.id == id)
                return true;
        }
        return false;
    };
    ActivitiesFilePersistence.prototype.getReference = function (value) {
        return _.pick(value, 'id', 'type', 'name');
    };
    ActivitiesFilePersistence.prototype.filterActivity = function (filter) {
        var _this = this;
        var id = filter.id || filter.activity_id;
        var type = filter.type;
        var include_types = filter.include_types;
        var exclude_types = filter.exclude_types;
        var party_id = filter.party_id;
        var ref_parent_id = filter.ref_parent_id;
        var ref_party_id = filter.ref_party_id;
        var ref_item_id = filter.ref_item_id;
        // Convert string parameters to arrays
        if (include_types && !_.isArray(include_types))
            include_types = ('' + include_types).split(',');
        if (exclude_types && !_.isArray(exclude_types))
            exclude_types = ('' + exclude_types).split(',');
        // Todo: Convert to date/time
        var start = filter.start;
        var end = filter.end;
        return function (item) {
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
            if (ref_parent_id && !_this.includeId(item.ref_parents, ref_parent_id))
                return false;
            if (ref_item_id && !_this.includeId(item.ref_parents, ref_item_id))
                return false;
            if (party_id && !_this.equalIds(item.party, party_id))
                return false;
            if (ref_party_id && !_this.equalIds(item.ref_party, ref_party_id))
                return false;
            if (ref_item_id && !_this.equalIds(item.ref_item, ref_item_id))
                return false;
            return true;
        };
    };
    // Gets activities by specific criteria
    ActivitiesFilePersistence.prototype.getPartyActivities = function (correlationId, filter, paging, callback) {
        var filterFunc = this.filterActivity(filter);
        this.getPage(filterFunc, paging, null, null, callback);
    };
    // Logs party activity
    ActivitiesFilePersistence.prototype.logPartyActivity = function (correlationId, activity, callback) {
        var _this = this;
        activity = _.pick(activity, 'id', 'time', 'type', 'party', 'ref_item', 'ref_parents', 'ref_party', 'details');
        // Ensure proper references        
        if (activity.party)
            activity.party = this.getReference(activity.party);
        if (activity.ref_item)
            activity.ref_item = this.getReference(activity.ref_item);
        if (activity.ref_parents)
            activity.ref_parents = _.map(activity.ref_parents, function (ref) { return _this.getReference(ref); });
        if (activity.ref_party)
            activity.ref_party = this.getReference(activity.ref_party);
        // Fill automatically generated fields
        activity.id = activity.id || this.createUuid();
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
        this.create(activity, callback);
    };
    // Deletes activities that satisfy specified filter
    ActivitiesFilePersistence.prototype.deletePartyActivities = function (correlationId, filter, callback) {
        var filterFunc = this.filterActivity(filter);
        var deletedItems = _.remove(this._items, filterFunc);
        // Exit if nothing was deleted
        if (deletedItems == null && deletedItems.length == 0) {
            callback(null, null);
            return;
        }
        // Save item collection
        this.save(function (err) {
            if (err)
                callback(err);
            else
                callback(null, deletedItems[0]);
        });
    };
    /**
     * Unique descriptor for the ActivitiesFilePersistence component
     */
    ActivitiesFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-activities", "file", "*");
    return ActivitiesFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.ActivitiesFilePersistence = ActivitiesFilePersistence;
