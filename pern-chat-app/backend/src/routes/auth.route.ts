import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/login', (request: Request, response: Response) => {
  response.send('Logged in successfully');
});

router.get('/logout', (request: Request, response: Response) => {
  response.send('Logged out successfully');
});

router.get('/signup', (request: Request, response: Response) => {
  response.send('Signed up successfully');
});

export default router;
