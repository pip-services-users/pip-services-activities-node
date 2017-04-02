import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { ActivitiesMemoryPersistence } from './ActivitiesMemoryPersistence';
import { PartyActivityV1 } from '../data/version1/PartyActivityV1';
export declare class ActivitiesFilePersistence extends ActivitiesMemoryPersistence {
    protected _persister: JsonFilePersister<PartyActivityV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
