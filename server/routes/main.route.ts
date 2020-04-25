import { Router, Request, Response } from 'express';

// create router
const router = Router();

// define routes
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Server Running fine!"
    })
});

// export the router
export const MainRoute = router;