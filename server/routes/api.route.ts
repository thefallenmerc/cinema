import express, { Router } from 'express';

// create router
const router = Router();

// define routes
router.get('/content', (req: express.Request, res: express.Response) => {
    return res.json({ red: 'red' });
});

// export the router
export const ApiRoute = router;
