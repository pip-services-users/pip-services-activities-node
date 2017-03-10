import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { ActivitiesMongoDbPersistence } from '../persistence/ActivitiesMongoDbPersistence';
import { ActivitiesFilePersistence } from '../persistence/ActivitiesFilePersistence';
import { ActivitiesMemoryPersistence } from '../persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../logic/ActivitiesController';
import { ActivitiesRestService } from '../services/version1/ActivitiesRestService';
import { ActivitiesSenecaService } from '../services/version1/ActivitiesSenecaService'; 

export class ActivitiesFactory extends ComponentFactory {
	public static Instance: ActivitiesFactory = new ActivitiesFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(ActivitiesFilePersistence.Descriptor, ActivitiesFilePersistence);
		this.register(ActivitiesMemoryPersistence.Descriptor, ActivitiesMemoryPersistence);
		this.register(ActivitiesMongoDbPersistence.Descriptor, ActivitiesMongoDbPersistence);
		this.register(ActivitiesController.Descriptor, ActivitiesController);
		this.register(ActivitiesRestService.Descriptor, ActivitiesRestService);
		this.register(ActivitiesSenecaService.Descriptor, ActivitiesSenecaService);
	}
	
}
