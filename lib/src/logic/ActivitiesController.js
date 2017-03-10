"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async = require('async');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var ActivitiesCommandSet_1 = require('./ActivitiesCommandSet');
var ActivitiesController = (function (_super) {
    __extends(ActivitiesController, _super);
    function ActivitiesController() {
        _super.call(this, ActivitiesController.Descriptor);
    }
    ActivitiesController.prototype.link = function (components) {
        // Locate reference to tags persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-activities", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new ActivitiesCommandSet_1.ActivitiesCommandSet(this);
        this.addCommandSet(commands);
    };
    ActivitiesController.prototype.getPartyActivities = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'activities.get_party_activities', callback);
        this._db.getPartyActivities(correlationId, filter, paging, callback);
    };
    ActivitiesController.prototype.logPartyActivity = function (correlationId, activity, callback) {
        callback = this.instrument(correlationId, 'activities.log_party_activity', callback);
        this._db.logPartyActivity(correlationId, activity, callback);
    };
    ActivitiesController.prototype.batchPartyActivities = function (correlationId, activities, callback) {
        var _this = this;
        callback = this.instrument(correlationId, 'activities.batch_party_activities', callback);
        async.each(activities, function (activity, callback) {
            _this._db.logPartyActivity(correlationId, activity, callback);
        }, function (err) {
            if (callback)
                callback(err);
        });
    };
    ActivitiesController.prototype.deletePartyActivities = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'activities.delete_party_activities', callback);
        this._db.deletePartyActivities(correlationId, filter, callback);
    };
    /**
     * Unique descriptor for the ActivitiesController component
     */
    ActivitiesController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-activities", "*", "*");
    return ActivitiesController;
}(pip_services_runtime_node_3.AbstractController));
exports.ActivitiesController = ActivitiesController;
