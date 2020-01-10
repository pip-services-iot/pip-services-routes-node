"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const RoutesServiceFactory_1 = require("../build/RoutesServiceFactory");
class RoutesLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("routes", "Object routes function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-routes', 'controller', 'default', '*', '*'));
        this._factories.add(new RoutesServiceFactory_1.RoutesServiceFactory());
    }
}
exports.RoutesLambdaFunction = RoutesLambdaFunction;
exports.handler = new RoutesLambdaFunction().getHandler();
//# sourceMappingURL=RoutesLambdaFunction.js.map