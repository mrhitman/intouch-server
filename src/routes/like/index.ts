import { Router } from 'express';
import add from './add';

const router = Router();

function routeFabric(type, route) {
    router.post(`/${type}/${route}`, (req, res) => {
        req.body.type = type;
        add(req, res);
    });
}

routeFabric('like', 'add');
routeFabric('like', 'delete');
routeFabric('dislike', 'add');
routeFabric('dislike', 'delete');

export default router;