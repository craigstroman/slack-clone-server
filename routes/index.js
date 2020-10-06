import { Router } from 'express';
import { indexPage } from '../controllers';

const router = new Router();

router.route('/').get(indexPage);

export default router;
