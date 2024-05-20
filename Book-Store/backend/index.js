import express from 'express'
import mongoose from 'mongoose';

import { PORT, MONGODB_URL } from './config.js'

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome!');
})

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