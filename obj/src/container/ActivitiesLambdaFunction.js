"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const ActivitiesFactory_1 = require("../build/ActivitiesFactory");
class ActivitiesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("activities", "Party activities function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-activities', 'controller', 'default', '*', '*'));
        this._factories.add(new ActivitiesFactory_1.ActivitiesFactory());
    }
}
exports.ActivitiesLambdaFunction = ActivitiesLambdaFunction;
exports.handler = new ActivitiesLambdaFunction().getHandler();
//# sourceMappingURL=ActivitiesLambdaFunction.js.map