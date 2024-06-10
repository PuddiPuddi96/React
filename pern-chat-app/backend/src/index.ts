import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js'
import dotnev from 'dotenv'

dotnev.config();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.get('/', (request: Request, response: Response) => {
  response.send('Hello world2!');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000!')
});
