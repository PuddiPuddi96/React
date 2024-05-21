import cors from 'cors'
import express from 'express';
import mongoose from 'mongoose';

import booksRoute from './routes/booksRoute.js'

import { PORT, MONGODB_URL } from './config.js'

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy

//Allows all
app.use(cors());

//Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome!');
});

app.use('/books', booksRoute);

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });