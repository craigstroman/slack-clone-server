import { Router } from 'express';
import { indexPage } from '../controllers';

const router = Router();

if (process.env.NODE_ENV === 'development') {
  router.route(/^\/(?!graphql).*/).get(indexPage);
}

router.route('/').get(indexPage);

router.route('/register').get(indexPage);

router.route('/login').get(indexPage);

router.route('/change-password/').get(indexPage);

router.route('/change-password/:token').get(indexPage);

router.route('/dashboard').get(indexPage);

export default router;
