import { Schema, model } from 'mongoose';

export default model('Cart', new Schema({
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
}));
