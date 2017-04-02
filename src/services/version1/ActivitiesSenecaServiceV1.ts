import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class ActivitiesSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('activities');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-activities', 'controller', 'default', '*', '1.0'));
    }
}