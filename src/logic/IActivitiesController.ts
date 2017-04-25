import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { PartyActivityV1 } from '../data/version1/PartyActivityV1';

export interface IActivitiesController {
    getPartyActivities(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PartyActivityV1>) => void): void;

    logPartyActivity(correlationId: string, activity: PartyActivityV1,
        callback?: (err: any, activity: PartyActivityV1) => void): void;

    batchPartyActivities(correlationId: string, activities: PartyActivityV1[],
        callback?: (err: any) => void): void;

    deletePartyActivities(correlationId: string, filter: FilterParams, 
        callback?: (err: any) => void): void;
}
