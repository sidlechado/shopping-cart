import { Schema } from 'mongoose';

const storeSchema = new Schema({
	_id: Number,
	name: String,
	description: String,
}, {
	timestamps: true,
});

export default storeSchema;
