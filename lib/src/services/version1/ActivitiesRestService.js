"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var ActivitiesRestService = (function (_super) {
    __extends(ActivitiesRestService, _super);
    function ActivitiesRestService() {
        _super.call(this, ActivitiesRestService.Descriptor);
    }
    ActivitiesRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-activities", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    ActivitiesRestService.prototype.getPartyActivities = function (req, res) {
        var filterParams = _.clone(req.params);
        if (req.params.partyId)
            filterParams.party_id = req.params.partyId;
        this._logic.getPartyActivities(req.params.correlation_id, pip_services_runtime_node_3.FilterParams.fromValue(filterParams), pip_services_runtime_node_4.PagingParams.fromValue(req.params), this.sendResult(req, res));
    };
    ActivitiesRestService.prototype.logPartyActivity = function (req, res) {
        this._logic.logPartyActivity(req.params.correlation_id, req.body, this.sendResult(req, res));
    };
    ActivitiesRestService.prototype.batchPartyActivities = function (req, res) {
        this._logic.batchPartyActivities(req.params.correlation_id, req.body, this.sendResult(req, res));
    };
    ActivitiesRestService.prototype.deletePartyActivities = function (req, res) {
        this._logic.deletePartyActivities(req.params.correlation_id, new pip_services_runtime_node_3.FilterParams(req.body), this.sendResult(req, res));
    };
    ActivitiesRestService.prototype.register = function () {
        this.registerRoute('get', '/activities', this.getPartyActivities);
        this.registerRoute('get', '/activities/:partyId', this.getPartyActivities);
        this.registerRoute('post', '/activities', this.logPartyActivity);
        this.registerRoute('post', '/activities/batch', this.batchPartyActivities);
        this.registerRoute('delete', '/activities/', this.deletePartyActivities);
    };
    /**
     * Unique descriptor for the ActivitiesRestService component
     */
    ActivitiesRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-activities", "rest", "1.0");
    return ActivitiesRestService;
}(pip_services_runtime_node_5.RestService));
exports.ActivitiesRestService = ActivitiesRestService;
