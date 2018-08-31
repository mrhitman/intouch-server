import { ChatChannel } from "../../models/chat-channel";

export default async (req, res) => {
  const { from, to } = req.body;
  let channel = await ChatChannel.query()
    .eager({ interlocutor: true })
    .findOne({ from, to });

  if (!channel) {
    channel = await ChatChannel.query()
      .eager({ interlocutor: true })
      .insertAndFetch({ from, to });
  }
  res.json(channel);
};
