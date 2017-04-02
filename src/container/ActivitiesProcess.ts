import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { ActivitiesFactory } from '../build/ActivitiesFactory';

export class ActivitiesProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve activities components
        references.put(ActivitiesFactory.Descriptor, new ActivitiesFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("activities", args, "./config/config.yaml");
    }

}
