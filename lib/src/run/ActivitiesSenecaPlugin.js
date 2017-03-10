"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var ActivitiesMicroservice_1 = require('./ActivitiesMicroservice');
var ActivitiesSenecaPlugin = (function (_super) {
    __extends(ActivitiesSenecaPlugin, _super);
    function ActivitiesSenecaPlugin() {
        _super.call(this, 'activities', new ActivitiesMicroservice_1.ActivitiesMicroservice());
    }
    return ActivitiesSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.ActivitiesSenecaPlugin = ActivitiesSenecaPlugin;
