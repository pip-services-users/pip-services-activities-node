// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var party_activities_v1_pb = require('./party_activities_v1_pb.js');

function serialize_activities_PartyActivityBatchRequest(arg) {
  if (!(arg instanceof party_activities_v1_pb.PartyActivityBatchRequest)) {
    throw new Error('Expected argument of type activities.PartyActivityBatchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_PartyActivityBatchRequest(buffer_arg) {
  return party_activities_v1_pb.PartyActivityBatchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_PartyActivityDeleteRequest(arg) {
  if (!(arg instanceof party_activities_v1_pb.PartyActivityDeleteRequest)) {
    throw new Error('Expected argument of type activities.PartyActivityDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_PartyActivityDeleteRequest(buffer_arg) {
  return party_activities_v1_pb.PartyActivityDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_PartyActivityLogRequest(arg) {
  if (!(arg instanceof party_activities_v1_pb.PartyActivityLogRequest)) {
    throw new Error('Expected argument of type activities.PartyActivityLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_PartyActivityLogRequest(buffer_arg) {
  return party_activities_v1_pb.PartyActivityLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_PartyActivityObjectReply(arg) {
  if (!(arg instanceof party_activities_v1_pb.PartyActivityObjectReply)) {
    throw new Error('Expected argument of type activities.PartyActivityObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_PartyActivityObjectReply(buffer_arg) {
  return party_activities_v1_pb.PartyActivityObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_PartyActivityOnlyErrorReply(arg) {
  if (!(arg instanceof party_activities_v1_pb.PartyActivityOnlyErrorReply)) {
    throw new Error('Expected argument of type activities.PartyActivityOnlyErrorReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_PartyActivityOnlyErrorReply(buffer_arg) {
  return party_activities_v1_pb.PartyActivityOnlyErrorReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_PartyActivityPageReply(arg) {
  if (!(arg instanceof party_activities_v1_pb.PartyActivityPageReply)) {
    throw new Error('Expected argument of type activities.PartyActivityPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_PartyActivityPageReply(buffer_arg) {
  return party_activities_v1_pb.PartyActivityPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_activities_PartyActivityPageRequest(arg) {
  if (!(arg instanceof party_activities_v1_pb.PartyActivityPageRequest)) {
    throw new Error('Expected argument of type activities.PartyActivityPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_activities_PartyActivityPageRequest(buffer_arg) {
  return party_activities_v1_pb.PartyActivityPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The activities service definition.
var PartyActivitiesService = exports.PartyActivitiesService = {
  get_party_activities: {
    path: '/activities.PartyActivities/get_party_activities',
    requestStream: false,
    responseStream: false,
    requestType: party_activities_v1_pb.PartyActivityPageRequest,
    responseType: party_activities_v1_pb.PartyActivityPageReply,
    requestSerialize: serialize_activities_PartyActivityPageRequest,
    requestDeserialize: deserialize_activities_PartyActivityPageRequest,
    responseSerialize: serialize_activities_PartyActivityPageReply,
    responseDeserialize: deserialize_activities_PartyActivityPageReply,
  },
  log_party_activity: {
    path: '/activities.PartyActivities/log_party_activity',
    requestStream: false,
    responseStream: false,
    requestType: party_activities_v1_pb.PartyActivityLogRequest,
    responseType: party_activities_v1_pb.PartyActivityObjectReply,
    requestSerialize: serialize_activities_PartyActivityLogRequest,
    requestDeserialize: deserialize_activities_PartyActivityLogRequest,
    responseSerialize: serialize_activities_PartyActivityObjectReply,
    responseDeserialize: deserialize_activities_PartyActivityObjectReply,
  },
  batch_party_activities: {
    path: '/activities.PartyActivities/batch_party_activities',
    requestStream: false,
    responseStream: false,
    requestType: party_activities_v1_pb.PartyActivityBatchRequest,
    responseType: party_activities_v1_pb.PartyActivityOnlyErrorReply,
    requestSerialize: serialize_activities_PartyActivityBatchRequest,
    requestDeserialize: deserialize_activities_PartyActivityBatchRequest,
    responseSerialize: serialize_activities_PartyActivityOnlyErrorReply,
    responseDeserialize: deserialize_activities_PartyActivityOnlyErrorReply,
  },
  delete_party_activities: {
    path: '/activities.PartyActivities/delete_party_activities',
    requestStream: false,
    responseStream: false,
    requestType: party_activities_v1_pb.PartyActivityDeleteRequest,
    responseType: party_activities_v1_pb.PartyActivityOnlyErrorReply,
    requestSerialize: serialize_activities_PartyActivityDeleteRequest,
    requestDeserialize: deserialize_activities_PartyActivityDeleteRequest,
    responseSerialize: serialize_activities_PartyActivityOnlyErrorReply,
    responseDeserialize: deserialize_activities_PartyActivityOnlyErrorReply,
  },
};

exports.PartyActivitiesClient = grpc.makeGenericClientConstructor(PartyActivitiesService);
