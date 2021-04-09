import { model, Schema } from 'mongoose';

export default model('Store', new Schema({
	_id: Number,
	name: String,
	description: String,
}, {
	timestamps: true,
}));
