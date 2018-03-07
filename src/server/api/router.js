import { router } from 'axon';

import render from 'server/api/controllers/render';

router.get('/', render);

export default router;
