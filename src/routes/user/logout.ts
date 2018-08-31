import { RefreshToken } from "../../models/refresh-token";

export default async (req, res) => {
  const user = req.user;

  await RefreshToken.query()
    .delete()
    .where({ user_id: user.id });

  res.json("ok");
};
