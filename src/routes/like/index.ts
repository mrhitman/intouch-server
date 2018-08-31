import { Router } from "express";
import add from "./add";

const router = Router();

function routeFabric(type, route) {
  router.post(`/${type}/${route}`, (req, res) => {
    req.body.type = type;
    add(req, res);
  });
}

routeFabric("likes", "add");
routeFabric("likes", "delete");
routeFabric("dislikes", "add");
routeFabric("dislikes", "delete");

export default router;
