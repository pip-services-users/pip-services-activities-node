import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IBusinessLogic } from 'pip-services-runtime-node';

export interface IActivitiesBusinessLogic extends IBusinessLogic {
    getPartyActivities(correlationId: string, filter: FilterParams, pagingParams: PagingParams, callback: any): void;
    logPartyActivity(correlationId: string, activity: any, callback: any): void;
    batchPartyActivities(correlationId: string, activities: any[], callback);
    deletePartyActivities(correlationId: string, filter: FilterParams, callback: any): void;
}
