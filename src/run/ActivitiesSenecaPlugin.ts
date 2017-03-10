import { SenecaPlugin } from 'pip-services-runtime-node';

import { ActivitiesMicroservice} from './ActivitiesMicroservice';

export class ActivitiesSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('activities', new ActivitiesMicroservice());
    }
}