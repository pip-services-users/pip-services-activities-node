let
    mongoose = require('mongoose'),

    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,

    ReferenceSchema = new Schema(
        {
            id: { type: String, required: true },
            type: { type: String, required: false },
            name: { type: String, required: false },
        }
    );

ReferenceSchema.set('toJSON', {
    transform: function (doc, ret) {
        //ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

let
    PartyActivitySchema = new Schema(
        {
            /* Identification */
            _id: { type: String, unique: true },

            /* Identification fields */
            time: { type: Date, required: true, index: true, 'default': Date.now },
            type: { type: String, required: true },
            party: { type: ReferenceSchema, required: true },

            /* References objects (notes, goals, etc.) */
            ref_item: { type: ReferenceSchema, required: false },
            ref_parents: { type: [ReferenceSchema], required: false },
            ref_party: { type: ReferenceSchema, required: false },

            /* Other details like % of progress or new status */
            details: { type: Mixed, required: false }
        },
        {
            collection: 'party_activities',
            autoIndex: true,
            strict: true
        }
    );

PartyActivitySchema.index({'party.id': 1});
PartyActivitySchema.index({'ref_item.type': 1, 'ref_item.id': 1});
PartyActivitySchema.index({'ref_parents.type': 1, 'ref_parents.id': 1});

PartyActivitySchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = function (connection) {
    return connection.model('PartyActivity', PartyActivitySchema);
};
