let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ActivitiesFilePersistence } from './ActivitiesFilePersistence';
import { IActivitiesPersistence } from './IActivitiesPersistence';

export class ActivitiesMemoryPersistence extends ActivitiesFilePersistence implements IActivitiesPersistence {
	/**
	 * Unique descriptor for the ActivitiesFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-activities", "memory", "*"
	);

    constructor() {
        super(ActivitiesMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}
