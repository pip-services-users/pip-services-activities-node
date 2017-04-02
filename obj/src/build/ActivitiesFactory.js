"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ActivitiesMongoDbPersistence_1 = require("../persistence/ActivitiesMongoDbPersistence");
const ActivitiesFilePersistence_1 = require("../persistence/ActivitiesFilePersistence");
const ActivitiesMemoryPersistence_1 = require("../persistence/ActivitiesMemoryPersistence");
const ActivitiesController_1 = require("../logic/ActivitiesController");
const ActivitiesHttpServiceV1_1 = require("../services/version1/ActivitiesHttpServiceV1");
const ActivitiesSenecaServiceV1_1 = require("../services/version1/ActivitiesSenecaServiceV1");
class ActivitiesFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ActivitiesFactory.MemoryPersistenceDescriptor, ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence);
        this.registerAsType(ActivitiesFactory.FilePersistenceDescriptor, ActivitiesFilePersistence_1.ActivitiesFilePersistence);
        this.registerAsType(ActivitiesFactory.MongoDbPersistenceDescriptor, ActivitiesMongoDbPersistence_1.ActivitiesMongoDbPersistence);
        this.registerAsType(ActivitiesFactory.ControllerDescriptor, ActivitiesController_1.ActivitiesController);
        this.registerAsType(ActivitiesFactory.SenecaServiceDescriptor, ActivitiesSenecaServiceV1_1.ActivitiesSenecaServiceV1);
        this.registerAsType(ActivitiesFactory.HttpServiceDescriptor, ActivitiesHttpServiceV1_1.ActivitiesHttpServiceV1);
    }
}
ActivitiesFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-activities", "factory", "default", "default", "1.0");
ActivitiesFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-activities", "persistence", "memory", "*", "1.0");
ActivitiesFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-activities", "persistence", "file", "*", "1.0");
ActivitiesFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-activities", "persistence", "mongodb", "*", "1.0");
ActivitiesFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-activities", "controller", "default", "*", "1.0");
ActivitiesFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-activities", "service", "seneca", "*", "1.0");
ActivitiesFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-activities", "service", "http", "*", "1.0");
exports.ActivitiesFactory = ActivitiesFactory;
//# sourceMappingURL=ActivitiesFactory.js.map