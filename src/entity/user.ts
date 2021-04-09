import { Schema } from 'mongoose';

const userSchema = new Schema({
	_id: Number,
	name: String,
}, {
	timestamps: true,
});

export default userSchema;
