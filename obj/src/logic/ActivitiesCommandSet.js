"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
class ActivitiesCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetPartyActivitiesCommand());
        this.addCommand(this.makeLogPartyActivityCommand());
        this.addCommand(this.makeBatchPartyActivitiesCommand());
        this.addCommand(this.makeDeletePartyActivitiesCommand());
    }
    makeGetPartyActivitiesCommand() {
        return new pip_services_commons_node_2.Command("get_party_activities", null, (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getPartyActivities(correlationId, filter, paging, callback);
        });
    }
    makeLogPartyActivityCommand() {
        return new pip_services_commons_node_2.Command("log_party_activity", null, (correlationId, args, callback) => {
            let activity = args.get("activity");
            this._logic.logPartyActivity(correlationId, activity, callback);
        });
    }
    makeBatchPartyActivitiesCommand() {
        return new pip_services_commons_node_2.Command("batch_party_activities", null, (correlationId, args, callback) => {
            let activities = args.getAsArray("activities");
            this._logic.batchPartyActivities(correlationId, activities, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
    makeDeletePartyActivitiesCommand() {
        return new pip_services_commons_node_2.Command("delete_party_activities", null, (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.deletePartyActivities(correlationId, filter, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
}
exports.ActivitiesCommandSet = ActivitiesCommandSet;
//# sourceMappingURL=ActivitiesCommandSet.js.map