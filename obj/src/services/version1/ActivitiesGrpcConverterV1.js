"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let messages = require('../../../../src/protos/activities_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
class ActivitiesGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_4.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        ActivitiesGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: ActivitiesGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_5.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (_.isFunction(values.toObject))
            values = values.toObject();
        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }
    static getMap(map) {
        let values = {};
        ActivitiesGrpcConverterV1.setMap(values, map);
        return values;
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_node_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromReference(reference) {
        if (reference == null)
            return null;
        let obj = new messages.Reference();
        obj.setId(reference.id);
        obj.setType(reference.type);
        obj.setName(reference.name);
        return obj;
    }
    static toReference(obj) {
        if (obj == null)
            return null;
        let reference = {
            id: obj.getId(),
            type: obj.getType(),
            name: obj.getName()
        };
        return reference;
    }
    static fromReferences(references) {
        if (references == null)
            return null;
        let a = [];
        references.forEach(ref => {
            let obj = new messages.Reference();
            obj.setId(ref.id);
            obj.setType(ref.type);
            obj.setName(ref.name);
            a.push(obj);
        });
        return a;
    }
    static toReferences(objArr) {
        if (objArr == null)
            return null;
        let references = [];
        objArr.forEach(obj => {
            let reference = {
                id: obj.getId(),
                type: obj.getType(),
                name: obj.getName()
            };
            references.push(reference);
        });
        return references;
    }
    static fromPartyActivity(activity) {
        if (activity == null)
            return null;
        let obj = new messages.PartyActivity();
        obj.setId(activity.id);
        obj.setTime(pip_services3_commons_node_2.StringConverter.toString(activity.time));
        obj.setType(activity.type);
        obj.setParty(ActivitiesGrpcConverterV1.fromReference(activity.party));
        obj.setRefItem(ActivitiesGrpcConverterV1.fromReference(activity.ref_item));
        obj.setRefParentsList(ActivitiesGrpcConverterV1.fromReferences(activity.ref_parents)); // ReferenceV1[]
        obj.setRefParty(ActivitiesGrpcConverterV1.fromReference(activity.ref_party));
        ActivitiesGrpcConverterV1.setMap(obj.getDetailsMap(), activity.details);
        return obj;
    }
    static toPartyActivity(obj) {
        if (obj == null)
            return null;
        let activity = {
            id: obj.getId(),
            time: pip_services3_commons_node_3.DateTimeConverter.toDateTime(obj.getTime()),
            type: obj.getType(),
            party: ActivitiesGrpcConverterV1.toReference(obj.getParty()),
            ref_item: ActivitiesGrpcConverterV1.toReference(obj.getRefItem()),
            ref_parents: ActivitiesGrpcConverterV1.toReferences(obj.getRefParentsList()),
            ref_party: ActivitiesGrpcConverterV1.toReference(obj.getRefParty()),
            details: ActivitiesGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return activity;
    }
    static toPartyActivities(objArr) {
        if (objArr == null)
            return null;
        let activities = [];
        objArr.forEach(obj => {
            activities.push(ActivitiesGrpcConverterV1.toPartyActivity(obj));
        });
        return activities;
    }
    static fromPartyActivityPage(page) {
        if (page == null)
            return null;
        let obj = new messages.PartyActivityPage();
        obj.setTotal(page.total);
        let data = _.map(page.data, ActivitiesGrpcConverterV1.fromPartyActivity);
        obj.setDataList(data);
        return obj;
    }
    static toPartyActivityPage(obj) {
        if (obj == null)
            return null;
        let data = _.map(obj.getDataList(), ActivitiesGrpcConverterV1.toPartyActivity);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.ActivitiesGrpcConverterV1 = ActivitiesGrpcConverterV1;
//# sourceMappingURL=ActivitiesGrpcConverterV1.js.map