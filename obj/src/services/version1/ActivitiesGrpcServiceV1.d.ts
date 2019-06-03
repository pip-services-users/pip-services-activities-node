import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class ActivitiesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getPartyActivities(call, callback);
    private logPartyActivity(call, callback);
    private batchPartyActivities(call, callback);
    private deletePartyActivities(call, callback);
    register(): void;
}
