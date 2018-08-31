import { Channel } from "../../models/channel";

export default async (req, res) => {
  const { from, to } = req.body;
  await Channel.query()
    .delete()
    .where({ from, to });
  res.json("ok");
};
