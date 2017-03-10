import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IPersistence } from 'pip-services-runtime-node';

export interface IActivitiesPersistence extends IPersistence {
    getPartyActivities(correlationId: string, filter: FilterParams, pagingParams: PagingParams, callback: any): void;
    logPartyActivity(correlationId: string, activity: any, callback: any): void;
    deletePartyActivities(correlationId: string, filter: FilterParams, callback: any): void;
}
