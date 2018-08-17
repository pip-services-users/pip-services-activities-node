import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { ActivitiesMongoDbPersistence } from '../persistence/ActivitiesMongoDbPersistence';
import { ActivitiesFilePersistence } from '../persistence/ActivitiesFilePersistence';
import { ActivitiesMemoryPersistence } from '../persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../logic/ActivitiesController';
import { ActivitiesHttpServiceV1 } from '../services/version1/ActivitiesHttpServiceV1';
import { ActivitiesSenecaServiceV1 } from '../services/version1/ActivitiesSenecaServiceV1'; 

export class ActivitiesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-activities", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-activities", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-activities", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-activities", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-activities", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-activities", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-activities", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ActivitiesServiceFactory.MemoryPersistenceDescriptor, ActivitiesMemoryPersistence);
		this.registerAsType(ActivitiesServiceFactory.FilePersistenceDescriptor, ActivitiesFilePersistence);
		this.registerAsType(ActivitiesServiceFactory.MongoDbPersistenceDescriptor, ActivitiesMongoDbPersistence);
		this.registerAsType(ActivitiesServiceFactory.ControllerDescriptor, ActivitiesController);
		this.registerAsType(ActivitiesServiceFactory.SenecaServiceDescriptor, ActivitiesSenecaServiceV1);
		this.registerAsType(ActivitiesServiceFactory.HttpServiceDescriptor, ActivitiesHttpServiceV1);
	}
	
}
