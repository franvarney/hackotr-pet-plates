var mongoose   = require('mongoose');
var timestamps = require('mongoose-timestamps');
var Schema     = mongoose.Schema;

var recipeSchema = new Schema({
    title:  { type: String, required: true },
    url: { type: String, required: true, index: { unique: true } },
    description: { type: String },
    notes: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    details: {
    	prep_time: { type: String, required: true },
    	cook_time: { type: String, required: true },
    	servings: { type: String, required: true }
    },
    ingredients: { type: Array, required: true },
    directions: { type: Array, required: true },
    type: { type: String },
    tags: { type: Array },
    image: {
        path: { type: String, default: 'recipes' },
        name: {
            original: { type: String, default: 'bones' },
            new: { type: String, default: 'bones' }
        },
        extension: { type: String, default: 'jpg' },
        mime: { type: String, default: 'image/jpeg' }
    },
    votes: {
        positive: { type: Number, default: 0 },
        negative: { type: Number, default: 0 },
        count: { type: Number }
    }
});

recipeSchema.plugin(timestamps);

mongoose.model('Recipe', recipeSchema);
