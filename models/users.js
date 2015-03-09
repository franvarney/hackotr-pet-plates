var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamps');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
	username: { type: String },
    local: {
        username: { type: String, required: true },
        password: { type: String, required: true}
    },
    role: {
    	isAdmin: { type: Boolean },
    	isUser: { type: Boolean },
    	isBrand: { type: Boolean }
    },
    image: {
        avatar: {
        	path: { type: String, default: 'users/avatar' },
	        name: { type: String, default: 'user-avatar' },
	        mime: { type: String, default: 'image/jpeg' }
	    },
	    avatar: {
        	path: { type: String, default: 'users/pets' },
	        name: { type: String, default: '' },
	        mime: { type: String, default: 'image/jpeg' }
	    },
    }
});
userSchema.plugin(timestamps);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);