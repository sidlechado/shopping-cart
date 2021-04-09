import mongoose from 'mongoose';

export default mongoose.connect(
	// 'mongodb+srv://sid:sidmongodb@cluster0-iftuw.mongodb.net/test?retryWrites=true&w=majority',
	'http://localhost:27017',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
);
