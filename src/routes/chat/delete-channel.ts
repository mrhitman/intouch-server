import { ChatChannel } from "../../models/chat-channel";

export default async (req, res) => {
  const { from, to } = req.body;
  await ChatChannel.query()
    .delete()
    .where({ from, to });
  res.json("ok");
};
