import { ProcessRunner } from 'pip-services-runtime-node';
import { ActivitiesMicroservice } from './ActivitiesMicroservice';

/**
 * Activities process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-25
 */
export class ActivitiesProcessRunner extends ProcessRunner {
    /**
     * Creates instance of activities process runner
     */
    constructor() {
        super(new ActivitiesMicroservice());
    }
}