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
var ActivitiesSenecaService = (function (_super) {
    __extends(ActivitiesSenecaService, _super);
    function ActivitiesSenecaService() {
        _super.call(this, ActivitiesSenecaService.Descriptor);
    }
    ActivitiesSenecaService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-activities", "*", "*"));
        _super.prototype.link.call(this, components);
        this.registerCommands('activities', this._logic.getCommands());
    };
    /**
     * Unique descriptor for the ActivitiesSenecaService component
     */
    ActivitiesSenecaService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-activities", "seneca", "1.0");
    return ActivitiesSenecaService;
}(pip_services_runtime_node_3.SenecaService));
exports.ActivitiesSenecaService = ActivitiesSenecaService;
