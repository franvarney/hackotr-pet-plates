var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamps');

var recipeSchema = new Schema({
    title:  { type: String, required: true },
    url: { type: String, required: true, index: { unique: true } },
    description: { type: String },
    notes: { type: String },
    user_id: { type: String },
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

module.exports = mongoose.model('Recipe', recipeSchema);