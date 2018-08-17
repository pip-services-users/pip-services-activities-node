"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ActivitiesMongoDbPersistence_1 = require("../persistence/ActivitiesMongoDbPersistence");
const ActivitiesFilePersistence_1 = require("../persistence/ActivitiesFilePersistence");
const ActivitiesMemoryPersistence_1 = require("../persistence/ActivitiesMemoryPersistence");
const ActivitiesController_1 = require("../logic/ActivitiesController");
const ActivitiesHttpServiceV1_1 = require("../services/version1/ActivitiesHttpServiceV1");
const ActivitiesSenecaServiceV1_1 = require("../services/version1/ActivitiesSenecaServiceV1");
class ActivitiesServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ActivitiesServiceFactory.MemoryPersistenceDescriptor, ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence);
        this.registerAsType(ActivitiesServiceFactory.FilePersistenceDescriptor, ActivitiesFilePersistence_1.ActivitiesFilePersistence);
        this.registerAsType(ActivitiesServiceFactory.MongoDbPersistenceDescriptor, ActivitiesMongoDbPersistence_1.ActivitiesMongoDbPersistence);
        this.registerAsType(ActivitiesServiceFactory.ControllerDescriptor, ActivitiesController_1.ActivitiesController);
        this.registerAsType(ActivitiesServiceFactory.SenecaServiceDescriptor, ActivitiesSenecaServiceV1_1.ActivitiesSenecaServiceV1);
        this.registerAsType(ActivitiesServiceFactory.HttpServiceDescriptor, ActivitiesHttpServiceV1_1.ActivitiesHttpServiceV1);
    }
}
ActivitiesServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-activities", "factory", "default", "default", "1.0");
ActivitiesServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-activities", "persistence", "memory", "*", "1.0");
ActivitiesServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-activities", "persistence", "file", "*", "1.0");
ActivitiesServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-activities", "persistence", "mongodb", "*", "1.0");
ActivitiesServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-activities", "controller", "default", "*", "1.0");
ActivitiesServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-activities", "service", "seneca", "*", "1.0");
ActivitiesServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-activities", "service", "http", "*", "1.0");
exports.ActivitiesServiceFactory = ActivitiesServiceFactory;
//# sourceMappingURL=ActivitiesServiceFactory.js.map