// package: activities
// file: party_activities_v1.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as party_activities_v1_pb from "./party_activities_v1_pb";

interface IPartyActivitiesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    get_party_activities: IPartyActivitiesService_Iget_party_activities;
    log_party_activity: IPartyActivitiesService_Ilog_party_activity;
    batch_party_activities: IPartyActivitiesService_Ibatch_party_activities;
    delete_party_activities: IPartyActivitiesService_Idelete_party_activities;
}

interface IPartyActivitiesService_Iget_party_activities extends grpc.MethodDefinition<party_activities_v1_pb.PartyActivityPageRequest, party_activities_v1_pb.PartyActivityPageReply> {
    path: string; // "/activities.PartyActivities/get_party_activities"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityPageRequest>;
    requestDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityPageRequest>;
    responseSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityPageReply>;
    responseDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityPageReply>;
}
interface IPartyActivitiesService_Ilog_party_activity extends grpc.MethodDefinition<party_activities_v1_pb.PartyActivityLogRequest, party_activities_v1_pb.PartyActivityObjectReply> {
    path: string; // "/activities.PartyActivities/log_party_activity"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityLogRequest>;
    requestDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityLogRequest>;
    responseSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityObjectReply>;
    responseDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityObjectReply>;
}
interface IPartyActivitiesService_Ibatch_party_activities extends grpc.MethodDefinition<party_activities_v1_pb.PartyActivityBatchRequest, party_activities_v1_pb.PartyActivityOnlyErrorReply> {
    path: string; // "/activities.PartyActivities/batch_party_activities"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityBatchRequest>;
    requestDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityBatchRequest>;
    responseSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityOnlyErrorReply>;
    responseDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityOnlyErrorReply>;
}
interface IPartyActivitiesService_Idelete_party_activities extends grpc.MethodDefinition<party_activities_v1_pb.PartyActivityDeleteRequest, party_activities_v1_pb.PartyActivityOnlyErrorReply> {
    path: string; // "/activities.PartyActivities/delete_party_activities"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityDeleteRequest>;
    requestDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityDeleteRequest>;
    responseSerialize: grpc.serialize<party_activities_v1_pb.PartyActivityOnlyErrorReply>;
    responseDeserialize: grpc.deserialize<party_activities_v1_pb.PartyActivityOnlyErrorReply>;
}

export const PartyActivitiesService: IPartyActivitiesService;

export interface IPartyActivitiesServer {
    get_party_activities: grpc.handleUnaryCall<party_activities_v1_pb.PartyActivityPageRequest, party_activities_v1_pb.PartyActivityPageReply>;
    log_party_activity: grpc.handleUnaryCall<party_activities_v1_pb.PartyActivityLogRequest, party_activities_v1_pb.PartyActivityObjectReply>;
    batch_party_activities: grpc.handleUnaryCall<party_activities_v1_pb.PartyActivityBatchRequest, party_activities_v1_pb.PartyActivityOnlyErrorReply>;
    delete_party_activities: grpc.handleUnaryCall<party_activities_v1_pb.PartyActivityDeleteRequest, party_activities_v1_pb.PartyActivityOnlyErrorReply>;
}

export interface IPartyActivitiesClient {
    get_party_activities(request: party_activities_v1_pb.PartyActivityPageRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityPageReply) => void): grpc.ClientUnaryCall;
    get_party_activities(request: party_activities_v1_pb.PartyActivityPageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityPageReply) => void): grpc.ClientUnaryCall;
    get_party_activities(request: party_activities_v1_pb.PartyActivityPageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityPageReply) => void): grpc.ClientUnaryCall;
    log_party_activity(request: party_activities_v1_pb.PartyActivityLogRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityObjectReply) => void): grpc.ClientUnaryCall;
    log_party_activity(request: party_activities_v1_pb.PartyActivityLogRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityObjectReply) => void): grpc.ClientUnaryCall;
    log_party_activity(request: party_activities_v1_pb.PartyActivityLogRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityObjectReply) => void): grpc.ClientUnaryCall;
    batch_party_activities(request: party_activities_v1_pb.PartyActivityBatchRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    batch_party_activities(request: party_activities_v1_pb.PartyActivityBatchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    batch_party_activities(request: party_activities_v1_pb.PartyActivityBatchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    delete_party_activities(request: party_activities_v1_pb.PartyActivityDeleteRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    delete_party_activities(request: party_activities_v1_pb.PartyActivityDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    delete_party_activities(request: party_activities_v1_pb.PartyActivityDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
}

export class PartyActivitiesClient extends grpc.Client implements IPartyActivitiesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public get_party_activities(request: party_activities_v1_pb.PartyActivityPageRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityPageReply) => void): grpc.ClientUnaryCall;
    public get_party_activities(request: party_activities_v1_pb.PartyActivityPageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityPageReply) => void): grpc.ClientUnaryCall;
    public get_party_activities(request: party_activities_v1_pb.PartyActivityPageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityPageReply) => void): grpc.ClientUnaryCall;
    public log_party_activity(request: party_activities_v1_pb.PartyActivityLogRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityObjectReply) => void): grpc.ClientUnaryCall;
    public log_party_activity(request: party_activities_v1_pb.PartyActivityLogRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityObjectReply) => void): grpc.ClientUnaryCall;
    public log_party_activity(request: party_activities_v1_pb.PartyActivityLogRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityObjectReply) => void): grpc.ClientUnaryCall;
    public batch_party_activities(request: party_activities_v1_pb.PartyActivityBatchRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    public batch_party_activities(request: party_activities_v1_pb.PartyActivityBatchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    public batch_party_activities(request: party_activities_v1_pb.PartyActivityBatchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    public delete_party_activities(request: party_activities_v1_pb.PartyActivityDeleteRequest, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    public delete_party_activities(request: party_activities_v1_pb.PartyActivityDeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
    public delete_party_activities(request: party_activities_v1_pb.PartyActivityDeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: party_activities_v1_pb.PartyActivityOnlyErrorReply) => void): grpc.ClientUnaryCall;
}
