import 'reflect-metadata';
import 'module-alias/register';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import api from './routes';

mongoose.connect(
	// 'mongodb+srv://sid:sidmongodb@cluster0-iftuw.mongodb.net/test?retryWrites=true&w=majority',
	'mongodb://mongo:123456@localhost:27017/shopping-cart?authSource=admin',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
);

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', api());

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(3333, () => {
	console.log('Server started on port 3333!');
});
