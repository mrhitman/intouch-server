import { Router } from "express";
import { authenticate } from "passport";

const router = Router();

router.get(
  "/channels/:user_id",
  authenticate("jwt", { session: false }),
  require("./get-channels").default
);
router.post(
  "/channels/delete",
  authenticate("jwt", { session: false }),
  require("./delete-channel").default
);
router.get(
  "/messages/:from/:to",
  authenticate("jwt", { session: false }),
  require("./get-messages").default
);
router.post(
  "/channels/create",
  authenticate("jwt", { session: false }),
  require("./create-channel").default
);

export default router;
