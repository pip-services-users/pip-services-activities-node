"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const ActivitiesFactory_1 = require("../build/ActivitiesFactory");
class ActivitiesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesFactory_1.ActivitiesFactory);
    }
}
exports.ActivitiesProcess = ActivitiesProcess;
//# sourceMappingURL=ActivitiesProcess.js.map