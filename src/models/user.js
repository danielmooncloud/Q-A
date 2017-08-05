'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	name : {
		type: String,
		required: true,
		trim: true
	},
	username : {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password : {
		type: String,
		required: true
	}
})


// Takes a username and password, looks up the record with a matching username and verifies the password
UserSchema.statics.authenticate = (username, password, callback) => {
	User.findOne({ username: username})
		.exec((error, user) => {
			if(error) return callback(error)
			else if(!user) {
				const err = new Error('User not found');
				err.status = 401;
				return callback(err);
			}
			//bcrypt.compare compares the supplied password with the encrypted password in the record
			bcrypt.compare(password, user.password, function(err, result) {
				if(result === true) return callback(null, user)
				else {
					const err = new Error('Password or username not valid');
					err.status = 401;
					return callback(err);
				}
			})
		})
};



// encrypts the supplied password before saving the user
UserSchema.pre("save", (next) => {
	const user = this;
	bcrypt.hash(user.password, 10, (err, hash) => {
		if(err) return next(err);
		user.password = hash;
		next();
	})
})

const User = mongoose.model('User', UserSchema);

module.exports = User;