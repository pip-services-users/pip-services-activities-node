"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.ActivitiesMongoDbSchema = function (collection) {
    collection = collection || 'party_activities';
    let referenceSchema = new mongoose_1.Schema({
        id: { type: String, required: true },
        type: { type: String, required: false },
        name: { type: String, required: false },
    });
    referenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String, unique: true },
        /* Identification fields */
        time: { type: Date, required: true, index: true, 'default': Date.now },
        type: { type: String, required: true },
        party: { type: referenceSchema, required: true },
        /* References objects (notes, goals, etc.) */
        ref_item: { type: referenceSchema, required: false },
        ref_parents: { type: [referenceSchema], required: false },
        ref_party: { type: referenceSchema, required: false },
        /* Other details like % of progress or new status */
        details: { type: Mixed, required: false }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.index({ 'party.id': 1 });
    schema.index({ 'ref_item.type': 1, 'ref_item.id': 1 });
    schema.index({ 'ref_parents.type': 1, 'ref_parents.id': 1 });
    schema.set('toJSON', {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=ActivitiesMongoDbSchema.js.map