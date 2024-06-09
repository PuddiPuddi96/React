import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/conversation', (request: Request, response: Response) => {
  response.send('conversation route');
});

export default router;
