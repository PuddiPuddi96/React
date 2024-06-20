import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js'
import dotnev from 'dotenv'
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

dotnev.config();
const PORT = process.env.PORT || 5001;

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (request: Request, response: Response) => {
  response.send('Hello world2!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`)
});
