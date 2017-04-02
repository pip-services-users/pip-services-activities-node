import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class ActivitiesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('activities');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-activities', 'controller', 'default', '*', '1.0'));
    }
}