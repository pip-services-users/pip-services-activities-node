import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { ActivitiesServiceFactory } from '../build/ActivitiesServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class ActivitiesProcess extends ProcessContainer {

    public constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }
}
