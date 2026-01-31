import { Router } from 'express';
import { indexPage } from '../controllers';

const router = Router();

if (process.env.NODE_ENV === 'development') {
  router.route(/^\/(?!graphql).*/).get(indexPage);
}

router.route('/').get(indexPage);

export default router;
