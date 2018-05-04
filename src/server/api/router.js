import Router from 'koa-router';

import render from 'server/api/controllers/render';

const router = new Router();

router.get('/', render);

export default router;
