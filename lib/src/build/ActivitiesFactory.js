"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var ActivitiesMongoDbPersistence_1 = require('../persistence/ActivitiesMongoDbPersistence');
var ActivitiesFilePersistence_1 = require('../persistence/ActivitiesFilePersistence');
var ActivitiesMemoryPersistence_1 = require('../persistence/ActivitiesMemoryPersistence');
var ActivitiesController_1 = require('../logic/ActivitiesController');
var ActivitiesRestService_1 = require('../services/version1/ActivitiesRestService');
var ActivitiesSenecaService_1 = require('../services/version1/ActivitiesSenecaService');
var ActivitiesFactory = (function (_super) {
    __extends(ActivitiesFactory, _super);
    function ActivitiesFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(ActivitiesFilePersistence_1.ActivitiesFilePersistence.Descriptor, ActivitiesFilePersistence_1.ActivitiesFilePersistence);
        this.register(ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence.Descriptor, ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence);
        this.register(ActivitiesMongoDbPersistence_1.ActivitiesMongoDbPersistence.Descriptor, ActivitiesMongoDbPersistence_1.ActivitiesMongoDbPersistence);
        this.register(ActivitiesController_1.ActivitiesController.Descriptor, ActivitiesController_1.ActivitiesController);
        this.register(ActivitiesRestService_1.ActivitiesRestService.Descriptor, ActivitiesRestService_1.ActivitiesRestService);
        this.register(ActivitiesSenecaService_1.ActivitiesSenecaService.Descriptor, ActivitiesSenecaService_1.ActivitiesSenecaService);
    }
    ActivitiesFactory.Instance = new ActivitiesFactory();
    return ActivitiesFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.ActivitiesFactory = ActivitiesFactory;
