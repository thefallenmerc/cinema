import { Router, Request, Response } from 'express';
import { MainController } from '../controllers';

// create router
const router = Router();

// define routes
router.get('/', MainController.index);

// export the router
export const MainRoute = router;