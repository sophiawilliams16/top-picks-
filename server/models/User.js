const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		uniqueCaseInsensitive: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: [/.+@.+\..+/, 'Must match an email address!'],
		uniqueCaseInsensitive: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
	},
	investment: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Investment',
		},
	],
	cash: {
		type: Number,
		required: true,
		trim: true,
		default: 100000,
	},
});

userSchema.virtual('investmentValue').get(function () {
	if (this.investment && this.investment.length > 0) {
		return this.investment.reduce((sum, investment) => {
			return sum + (investment.currentValue * investment.quantity || 0);
		}, 0);
	} else {
		return 0;
	}
});

userSchema.virtual('totalValue').get(function () {
	let totalValue = this.cash || 0;

	if (this.investment && this.investment.length > 0) {
		totalValue += this.investment.reduce((sum, investment) => {
			return sum + (this.investment.currentValue || 0);
		}, 0);
	}

	return totalValue;
});

userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.plugin(uniqueValidator, {
	message: 'Error, expected {PATH} to be unique.',
});

const User = model('User', userSchema);

module.exports = User;
