import { Schema } from 'mongoose';

const cartSchema = new Schema({
	_id: Number,
	order: {
		products: [{
			product_id: Number,
			description: String,
			value: Number,
			quantity: Number,
			isCouponAppliable: Boolean,
		}],
		hasCouponApplied: Boolean,
	},
	totalValue: Number,
}, {
	timestamps: true,
});

export default cartSchema;
