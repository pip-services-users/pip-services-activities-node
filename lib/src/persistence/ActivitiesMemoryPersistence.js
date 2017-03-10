"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var ActivitiesFilePersistence_1 = require('./ActivitiesFilePersistence');
var ActivitiesMemoryPersistence = (function (_super) {
    __extends(ActivitiesMemoryPersistence, _super);
    function ActivitiesMemoryPersistence() {
        _super.call(this, ActivitiesMemoryPersistence.Descriptor);
    }
    ActivitiesMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    ActivitiesMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the ActivitiesFilePersistence component
     */
    ActivitiesMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-activities", "memory", "*");
    return ActivitiesMemoryPersistence;
}(ActivitiesFilePersistence_1.ActivitiesFilePersistence));
exports.ActivitiesMemoryPersistence = ActivitiesMemoryPersistence;
