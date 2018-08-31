import { ChatChannel } from "../../models/chat-channel";

export default async (req, res) => {
  const id = req.params.user_id;
  const channels = await ChatChannel.query()
    .eager({ interlocutor: true })
    .where({ from: id });
  res.json(channels);
};
