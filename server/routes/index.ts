import { Router } from 'express';
import { MainRoute } from './main.route';
import { ApiRoute } from './api.route';

// create router
const router = Router();

// include all route files
router.use('/api', ApiRoute);
router.use('**', MainRoute);

// export the router
const Routes = router;
export default Routes;
