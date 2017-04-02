"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const ActivitiesFactory_1 = require("../build/ActivitiesFactory");
class ActivitiesProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve activities components
        references.put(ActivitiesFactory_1.ActivitiesFactory.Descriptor, new ActivitiesFactory_1.ActivitiesFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("activities", args, "./config/config.yaml");
    }
}
exports.ActivitiesProcess = ActivitiesProcess;
//# sourceMappingURL=ActivitiesProcess.js.map