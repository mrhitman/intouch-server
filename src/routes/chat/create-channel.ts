import { Channel } from "../../models/channel";

export default async (req, res) => {
  const { from, to } = req.body;
  let channel = await Channel.query()
    .eager({ interlocutor: true })
    .findOne({ from, to });

  if (!channel) {
    channel = await Channel.query()
      .eager({ interlocutor: true })
      .insertAndFetch({ from, to });
  }
  res.json(channel);
};
