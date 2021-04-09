import { model, Schema } from 'mongoose';

export default model('User', new Schema({
	_id: {
		type: Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	name: {
		type: String,
		required: true,
	},
	cpf: {
		type: String,
		required: true,
	},
}, {
	timestamps: true,
}));
