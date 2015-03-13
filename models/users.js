var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamps');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
    local: {
        email: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true }
    },
    role: {
    	isAdmin: { type: Boolean, default: 0 },
    	isUser: { type: Boolean, default: 1 },
    	isBrand: { type: Boolean, default: 0 }
    },
    image: {
        avatar: {
        	path: { type: String, default: 'users/avatars' },
	        name: {
                original: { type: String, default: 'user-avatar' },
                new: { type: String, default: 'user-avatar' }
            },
            extension: { type: String, default: 'jpg' },
	        mime: { type: String, default: 'image/jpeg' }
	    },
	    pets: {
        	path: { type: String, default: 'users/pets' },
	        name: { type: String, default: '' },
	        mime: { type: String, default: 'image/jpeg' }
	    },
    }
});
userSchema.plugin(timestamps);

// generate hashed password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('User', userSchema);
