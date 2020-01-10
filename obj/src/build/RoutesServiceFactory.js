"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const RoutesMongoDbPersistence_1 = require("../persistence/RoutesMongoDbPersistence");
const RoutesFilePersistence_1 = require("../persistence/RoutesFilePersistence");
const RoutesMemoryPersistence_1 = require("../persistence/RoutesMemoryPersistence");
const RoutesController_1 = require("../logic/RoutesController");
const RoutesHttpServiceV1_1 = require("../services/version1/RoutesHttpServiceV1");
class RoutesServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(RoutesServiceFactory.MemoryPersistenceDescriptor, RoutesMemoryPersistence_1.RoutesMemoryPersistence);
        this.registerAsType(RoutesServiceFactory.FilePersistenceDescriptor, RoutesFilePersistence_1.RoutesFilePersistence);
        this.registerAsType(RoutesServiceFactory.MongoDbPersistenceDescriptor, RoutesMongoDbPersistence_1.RoutesMongoDbPersistence);
        this.registerAsType(RoutesServiceFactory.ControllerDescriptor, RoutesController_1.RoutesController);
        this.registerAsType(RoutesServiceFactory.HttpServiceDescriptor, RoutesHttpServiceV1_1.RoutesHttpServiceV1);
    }
}
exports.RoutesServiceFactory = RoutesServiceFactory;
RoutesServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-routes", "factory", "default", "default", "1.0");
RoutesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-routes", "persistence", "memory", "*", "1.0");
RoutesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-routes", "persistence", "file", "*", "1.0");
RoutesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-routes", "persistence", "mongodb", "*", "1.0");
RoutesServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-routes", "controller", "default", "*", "1.0");
RoutesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-routes", "service", "http", "*", "1.0");
//# sourceMappingURL=RoutesServiceFactory.js.map