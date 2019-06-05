"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let messages = require('../../../../src/protos/party_activities_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
class ActivityGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_3.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.getType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        ActivityGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
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
            details: ActivityGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_4.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        for (let propName in values) {
            if (values.hasOwnProperty(propName))
                map[propName] = values[propName];
        }
    }
    static getMap(map) {
        let values = {};
        ActivityGrpcConverterV1.setMap(values, map);
        return values;
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
        let obj = new messages.Reference();
        let a = [];
        references.forEach(ref => {
            obj.setId(ref.id);
            obj.setType(ref.type);
            obj.setName(ref.name);
            a.push(ref);
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
    static fromPartyActivity(partyActivity) {
        if (partyActivity == null)
            return null;
        let obj = new messages.PartyActivity();
        obj.setId(partyActivity.id);
        obj.setTime(pip_services3_commons_node_1.StringConverter.toString(partyActivity.time));
        obj.setParty(ActivityGrpcConverterV1.toReference(partyActivity.party));
        obj.setRefItem(ActivityGrpcConverterV1.toReference(partyActivity.ref_item));
        obj.setRefParents(ActivityGrpcConverterV1.toReferences(partyActivity.ref_parents)); // ReferenceV1[]
        obj.setRefParty(ActivityGrpcConverterV1.toReference(partyActivity.ref_party));
        ActivityGrpcConverterV1.setMap(obj.getDetailsMap(), partyActivity.details);
        return obj;
    }
    static toPartyActivity(obj) {
        if (obj == null)
            return null;
        let partyActivity = {
            id: obj.getId(),
            time: pip_services3_commons_node_2.DateTimeConverter.toDateTime(obj.getTime()),
            type: obj.getType(),
            party: ActivityGrpcConverterV1.fromReference(obj.getParty()),
            ref_item: ActivityGrpcConverterV1.fromReference(obj.getRefItem()),
            ref_parents: ActivityGrpcConverterV1.fromReferences(obj.getRefParents()),
            ref_party: ActivityGrpcConverterV1.fromReference(obj.getRefParty()),
            details: ActivityGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return partyActivity;
    }
    static toPartyActivities(objArr) {
        if (objArr == null)
            return null;
        let partyActivities = [];
        objArr.forEach(obj => {
            partyActivities.push(ActivityGrpcConverterV1.toPartyActivity(obj));
        });
        return partyActivities;
    }
    static fromPartyActivityPage(page) {
        if (page == null)
            return null;
        let obj = new messages.PartyActivityPage();
        obj.setTotal(page.total);
        let data = _.map(page.data, ActivityGrpcConverterV1.fromPartyActivity);
        obj.setDataList(data);
        return obj;
    }
    static toPartyActivityPage(obj) {
        if (obj == null)
            return null;
        let data = _.map(obj.getDataList(), ActivityGrpcConverterV1.toPartyActivity);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.ActivityGrpcConverterV1 = ActivityGrpcConverterV1;
//# sourceMappingURL=ActivityGrpcConverterV1.js.map