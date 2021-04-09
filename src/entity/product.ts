import { model, Schema } from 'mongoose';

export default model('Product', new Schema({
	_id: Number,
	name: String,
	description: String,
	isCouponAppliable: Boolean,
	value: Number,
	stockQty: Number,
}, {
	timestamps: true,
}));
