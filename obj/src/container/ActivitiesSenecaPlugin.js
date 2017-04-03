"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const ActivitiesMemoryPersistence_1 = require("../persistence/ActivitiesMemoryPersistence");
const ActivitiesFilePersistence_1 = require("../persistence/ActivitiesFilePersistence");
const ActivitiesMongoDbPersistence_1 = require("../persistence/ActivitiesMongoDbPersistence");
const ActivitiesController_1 = require("../logic/ActivitiesController");
const ActivitiesSenecaServiceV1_1 = require("../services/version1/ActivitiesSenecaServiceV1");
class ActivitiesSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-activities', seneca, ActivitiesSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new ActivitiesController_1.ActivitiesController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new ActivitiesMongoDbPersistence_1.ActivitiesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new ActivitiesFilePersistence_1.ActivitiesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let service = new ActivitiesSenecaServiceV1_1.ActivitiesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-activities', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-activities', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-activities', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.ActivitiesSenecaPlugin = ActivitiesSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new ActivitiesSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=ActivitiesSenecaPlugin.js.map