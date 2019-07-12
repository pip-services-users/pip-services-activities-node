let _ = require('lodash');
let services = require('../../../../src/protos/activities_v1_grpc_pb');
let messages = require('../../../../src/protos/activities_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { IActivitiesController } from '../../logic/IActivitiesController';
import { ActivityGrpcConverterV1 } from './ActivityGrpcConverterV1';

export class ActivitiesGrpcServiceV1 extends GrpcService {
    private _controller: IActivitiesController;

    public constructor() {
        super(services.ActivitiesService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-activities", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IActivitiesController>('controller');
    }

    private getPartyActivities(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        ActivityGrpcConverterV1.setMap(call.request.getFilterMap(), filter);
        let paging = ActivityGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getPartyActivities(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = ActivityGrpcConverterV1.fromError(err);
                let page = err == null ? ActivityGrpcConverterV1.fromPartyActivityPage(result) : null;

                let response = new messages.PartyActivityPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private logPartyActivity(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let activity = ActivityGrpcConverterV1.toPartyActivity(call.request.getActivity());

        this._controller.logPartyActivity(
            correlationId,
            activity,
            (err, result) => {
                let error = ActivityGrpcConverterV1.fromError(err);
                let activity = err == null ? ActivityGrpcConverterV1.fromPartyActivity(result) : null;

                let response = new messages.PartyActivityObjectReply();
                response.setError(error);
                if (result)
                    response.setPartyActivity(activity);

                callback(err, response);
            }
        )
    }

    private batchPartyActivities(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let activities = ActivityGrpcConverterV1.toPartyActivities(call.request.getActivitiesList());

        this._controller.batchPartyActivities(
            correlationId,
            activities,
            (err) => {
                let error = ActivityGrpcConverterV1.fromError(err);

                let response = new messages.PartyActivityOnlyErrorReply();
                response.setError(error);

                callback(err, response);
            }
        )
    }

    private deletePartyActivities(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = FilterParams.fromValue(call.request.filterMap);

        this._controller.deletePartyActivities(
            correlationId,
            filter,
            (err) => {
                let error = ActivityGrpcConverterV1.fromError(err);

                let response = new messages.PartyActivityOnlyErrorReply();
                response.setError(error);

                callback(err, response);
            }
        )
    }

    public register() {
        this.registerMethod(
            'get_party_activities',
            null,
            this.getPartyActivities
        );

        this.registerMethod(
            'log_party_activity',
            null,
            this.logPartyActivity
        );

        this.registerMethod(
            'batch_party_activities',
            null,
            this.batchPartyActivities
        );

        this.registerMethod(
            'delete_party_activities',
            null,
            this.deletePartyActivities
        );
        
    }
}