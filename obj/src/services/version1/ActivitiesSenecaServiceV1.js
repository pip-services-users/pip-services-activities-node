"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class ActivitiesSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('activities');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-activities', 'controller', 'default', '*', '1.0'));
    }
}
exports.ActivitiesSenecaServiceV1 = ActivitiesSenecaServiceV1;
//# sourceMappingURL=ActivitiesSenecaServiceV1.js.map