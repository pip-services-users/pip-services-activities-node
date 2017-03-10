"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var ActivitiesFactory_1 = require('../build/ActivitiesFactory');
/**
 * Activities microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-25
 */
var ActivitiesMicroservice = (function (_super) {
    __extends(ActivitiesMicroservice, _super);
    /**
     * Creates instance of activities microservice.
     */
    function ActivitiesMicroservice() {
        _super.call(this, "pip-services-activities", ActivitiesFactory_1.ActivitiesFactory.Instance);
    }
    return ActivitiesMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.ActivitiesMicroservice = ActivitiesMicroservice;
