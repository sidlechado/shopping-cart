import { Schema, model } from 'mongoose';

export default model('Coupon', new Schema({
	_id: Number,
	tag: String,
	description: String,
	descountPercent: Number, // 0 to 1
}, {
	timestamps: true,
}));
