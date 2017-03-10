"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var ActivitiesMicroservice_1 = require('./ActivitiesMicroservice');
/**
 * Activities process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-25
 */
var ActivitiesProcessRunner = (function (_super) {
    __extends(ActivitiesProcessRunner, _super);
    /**
     * Creates instance of activities process runner
     */
    function ActivitiesProcessRunner() {
        _super.call(this, new ActivitiesMicroservice_1.ActivitiesMicroservice());
    }
    return ActivitiesProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.ActivitiesProcessRunner = ActivitiesProcessRunner;
