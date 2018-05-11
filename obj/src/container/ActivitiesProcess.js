"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const ActivitiesServiceFactory_1 = require("../build/ActivitiesServiceFactory");
class ActivitiesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesServiceFactory_1.ActivitiesServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.ActivitiesProcess = ActivitiesProcess;
//# sourceMappingURL=ActivitiesProcess.js.map