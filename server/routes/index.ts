import { Router } from "express";
import { MainRoute } from "./main.route";

// create router
const router = Router();

// include all route files
router.get('/', MainRoute);


// export the router
const Routes = router;
export default Routes;