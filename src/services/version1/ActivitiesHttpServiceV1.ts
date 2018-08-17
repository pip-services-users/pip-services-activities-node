import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class ActivitiesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/activities');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-activities', 'controller', 'default', '*', '1.0'));
    }
}