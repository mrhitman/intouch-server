import { Router } from "express";
import { authenticate } from "passport";
import * as joi from "joi";
import validate from "../../middlewares/joi";

const router = Router();

router.get(
  "/:id",
  authenticate("jwt", { session: false }),
  require("./get").default
);

const schema = joi.object().keys({
  author_id: joi.number().required(),
  owner_id: joi.number().required(),
  content: joi.string()
});

router.post(
  "/comment",
  authenticate("jwt", { session: false }),
  validate(schema),
  require("./comment").default
);

export default router;
