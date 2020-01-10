import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RoutesMongoDbPersistence } from '../persistence/RoutesMongoDbPersistence';
import { RoutesFilePersistence } from '../persistence/RoutesFilePersistence';
import { RoutesMemoryPersistence } from '../persistence/RoutesMemoryPersistence';
import { RoutesController } from '../logic/RoutesController';
import { RoutesHttpServiceV1 } from '../services/version1/RoutesHttpServiceV1';

export class RoutesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-routes", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-routes", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-routes", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-routes", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-routes", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-routes", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RoutesServiceFactory.MemoryPersistenceDescriptor, RoutesMemoryPersistence);
		this.registerAsType(RoutesServiceFactory.FilePersistenceDescriptor, RoutesFilePersistence);
		this.registerAsType(RoutesServiceFactory.MongoDbPersistenceDescriptor, RoutesMongoDbPersistence);
		this.registerAsType(RoutesServiceFactory.ControllerDescriptor, RoutesController);
		this.registerAsType(RoutesServiceFactory.HttpServiceDescriptor, RoutesHttpServiceV1);
	}
	
}
