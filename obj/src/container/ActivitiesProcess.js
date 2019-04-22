"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const ActivitiesServiceFactory_1 = require("../build/ActivitiesServiceFactory");
class ActivitiesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesServiceFactory_1.ActivitiesServiceFactory);
    }
}
exports.ActivitiesProcess = ActivitiesProcess;
//# sourceMappingURL=ActivitiesProcess.js.map