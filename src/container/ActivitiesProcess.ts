import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { ActivitiesServiceFactory } from '../build/ActivitiesServiceFactory';

export class ActivitiesProcess extends ProcessContainer {

    public constructor() {
        super("activities", "Party activities microservice");
        this._factories.add(new ActivitiesServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }
}
