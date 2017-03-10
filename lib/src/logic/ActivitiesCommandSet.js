"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var ActivitiesCommandSet = (function (_super) {
    __extends(ActivitiesCommandSet, _super);
    function ActivitiesCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPartyActivitiesCommand());
        this.addCommand(this.makeLogPartyActivityCommand());
        this.addCommand(this.makeBatchPartyActivitiesCommand());
        this.addCommand(this.makeDeletePartyActivitiesCommand());
    }
    ActivitiesCommandSet.prototype.makeGetPartyActivitiesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_party_activities", new pip_services_runtime_node_3.Schema()
            .withProperty("filter", "FilterParams")
            .withProperty("paging", "PagingParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            var paging = pip_services_runtime_node_5.PagingParams.fromValue(args.get("filter"));
            _this._logic.getPartyActivities(correlationId, filter, paging, callback);
        });
    };
    ActivitiesCommandSet.prototype.makeLogPartyActivityCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "log_party_activity", new pip_services_runtime_node_3.Schema()
            .withProperty("activity", "any"), function (correlationId, args, callback) {
            var activity = args.get("activity");
            _this._logic.logPartyActivity(correlationId, activity, callback);
        });
    };
    ActivitiesCommandSet.prototype.makeBatchPartyActivitiesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "batch_party_activities", new pip_services_runtime_node_3.Schema()
            .withArray("activities", "any"), function (correlationId, args, callback) {
            var activities = args.getArray("activities");
            _this._logic.batchPartyActivities(correlationId, activities, callback);
        });
    };
    ActivitiesCommandSet.prototype.makeDeletePartyActivitiesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "delete_party_activities", new pip_services_runtime_node_3.Schema()
            .withProperty("filter", "FilterParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            _this._logic.deletePartyActivities(correlationId, filter, callback);
        });
    };
    return ActivitiesCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.ActivitiesCommandSet = ActivitiesCommandSet;
