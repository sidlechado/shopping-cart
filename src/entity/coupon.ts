import { Schema } from 'mongoose';

const couponSchema = new Schema({
	_id: Number,
	tag: String,
	description: String,
	descountPercent: Number, // 0 to 1
}, {
	timestamps: true,
});

export default couponSchema;
