import { Microservice } from 'pip-services-runtime-node';

import { ActivitiesFactory } from '../build/ActivitiesFactory';

/**
 * Activities microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-25
 */
export class ActivitiesMicroservice extends Microservice {
	/**
	 * Creates instance of activities microservice.
	 */
	constructor() {
		super("pip-services-activities", ActivitiesFactory.Instance);
	}
}
