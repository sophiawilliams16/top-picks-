const { Schema, model } = require('mongoose');

const portfolioSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	investment: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Investment',
		},
	],
	portfolioValue: {
		type: Number, 
		required: true, 
		trim: true,
	},
});

const Portfolio = model('Portfolio', portfolioSchema);

module.exports = Portfolio;
