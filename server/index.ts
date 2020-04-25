import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Routes from './routes';
import path from 'path';

const app = express();

// Add morgan logging
app.use(morgan(":method :url :status :res[content-length] :response-time ms"));

// Use config env
dotenv.config();

// Use views
app.set('view engine', 'ejs');
app.set('views', path.resolve('server', 'views'));

// Static
app.use(express.static('public'));

// use routes
app.use(Routes);

// listen to .env port or 3000
app.listen(process.env.PORT || '3000');