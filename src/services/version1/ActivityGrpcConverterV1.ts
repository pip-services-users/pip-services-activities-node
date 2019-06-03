let _ = require('lodash');
let messages = require('../../../../src/protos/partyActivitys_v1_pb');

import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { ErrorDescriptionFactory } from 'pip-services3-commons-node';
import { ErrorDescription } from 'pip-services3-commons-node';
import { ApplicationExceptionFactory } from 'pip-services3-commons-node';

import { PartyActivityV1 } from '../../data/version1/PartyActivityV1';
import { ReferenceV1 } from '../../data/version1/ReferenceV1';

export class ActivityGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
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

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: ActivityGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        for (let propName in values) {
            if (values.hasOwnProperty(propName))
                map[propName] = values[propName];
        }
    }

    public static getMap(map: any): any {
        let values = {};
        ActivityGrpcConverterV1.setMap(values, map);
        return values;
    }

    public static fromReference(reference: ReferenceV1): any {
        if (reference == null) return null;

        let obj = new messages.Reference();

        obj.setId(reference.id);
        obj.setType(reference.type);
        obj.setName(reference.name);

        return obj;
    }

    public static toReference(obj: any): ReferenceV1 {
        if (obj == null) return null;

        let reference: ReferenceV1 = {
            id: obj.getId(),
            type: obj.getType(),
            name: obj.getName()
        };

        return reference;
    }

    public static fromReferences(references: ReferenceV1[]): any {
        if (references == null) return null;

        let obj = new messages.Reference();
        let a = []

        references.forEach(ref => {
            obj.setId(ref.id);
            obj.setType(ref.type);
            obj.setName(ref.name);

            a.push(ref);
        });

        return a;
    }

    public static toReferences(objArr: any): ReferenceV1[] {
        if (objArr == null) return null;

        let references = []

        objArr.forEach(obj => {
            let reference: ReferenceV1 = {
                id: obj.getId(),
                type: obj.getType(),
                name: obj.getName()
            };

            references.push(reference);
        });

        return references;
    }

    public static fromPartyActivity(partyActivity: PartyActivityV1): any {
        if (partyActivity == null) return null;

        let obj = new messages.PartyActivity();

        obj.setId(partyActivity.id);
        obj.setTime(StringConverter.toString(partyActivity.time));
        obj.setParty(ActivityGrpcConverterV1.toReference(partyActivity.party));
        obj.setRefItem(ActivityGrpcConverterV1.toReference(partyActivity.ref_item));
        obj.setRefParents(ActivityGrpcConverterV1.toReferences(partyActivity.ref_parents)); // ReferenceV1[]
        obj.setRefParty(ActivityGrpcConverterV1.toReference(partyActivity.ref_party));
        ActivityGrpcConverterV1.setMap(obj.getDetailsMap(), partyActivity.details);

        return obj;
    }

    public static toPartyActivity(obj: any): PartyActivityV1 {
        if (obj == null) return null;

        let partyActivity: PartyActivityV1 = {
            id: obj.getId(),
            time: DateTimeConverter.toDateTime(obj.getTime()),
            type: obj.getType(),
            party: ActivityGrpcConverterV1.fromReference(obj.getParty()),
            ref_item: ActivityGrpcConverterV1.fromReference(obj.getRefItem()),
            ref_parents: ActivityGrpcConverterV1.fromReferences(obj.getRefParents()), // Reference[]
            ref_party: ActivityGrpcConverterV1.fromReference(obj.getRefParty()),
            details: ActivityGrpcConverterV1.getMap(obj.getDetailsMap())
        };

        return partyActivity;
    }

    public static toPartyActivities(objArr: any): PartyActivityV1[] {
        if (objArr == null) return null;

        let partyActivities = []

        objArr.forEach(obj => {
            partyActivities.push(ActivityGrpcConverterV1.toPartyActivity(obj));
        });

        return partyActivities;
    }

    public static fromPartyActivityPage(page: DataPage<PartyActivityV1>): any {
        if (page == null) return null;

        let obj = new messages.PartyActivityPage();

        obj.setTotal(page.total);
        let data = _.map(page.data, ActivityGrpcConverterV1.fromPartyActivity);
        obj.setDataList(data);

        return obj;
    }

    public static toPartyActivityPage(obj: any): DataPage<PartyActivityV1> {
        if (obj == null) return null;

        let data = _.map(obj.getDataList(), ActivityGrpcConverterV1.toPartyActivity);
        let page: DataPage<PartyActivityV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}