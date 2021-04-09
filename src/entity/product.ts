import { Schema } from 'mongoose';

const productSchema = new Schema({
	_id: Number,
	name: String,
	description: String,
	isCouponAppliable: Boolean,
	value: Number,
	stockQty: Number,
}, {
	timestamps: true,
});

export default productSchema;
