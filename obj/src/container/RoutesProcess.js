"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const RoutesServiceFactory_1 = require("../build/RoutesServiceFactory");
class RoutesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("routes", "Object routes microservice");
        this._factories.add(new RoutesServiceFactory_1.RoutesServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.RoutesProcess = RoutesProcess;
//# sourceMappingURL=RoutesProcess.js.map