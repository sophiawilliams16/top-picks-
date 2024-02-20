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
});

portfolioSchema.virtual("portfolioValue").get(function () {
    if (this.investment && this.investment.length > 0) {
        return this.investment.reduce((sum, investment) => {
            return sum + (investment.currentValue * investment.quantity || 0);
        }, 0);
    } else {
        return 0;
    }
});

const Portfolio = model('Portfolio', portfolioSchema);

module.exports = Portfolio;
