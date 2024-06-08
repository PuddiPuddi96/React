import express, { Request, Response } from 'express';

const app = express();

app.get('/', (request: Request, response: Response) => {
  response.send('Hello world2!');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000!')
});
