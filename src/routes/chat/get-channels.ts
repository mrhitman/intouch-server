import { Channel } from "../../models/channel";

export default async (req, res) => {
  const id = req.params.user_id;
  const channels = await Channel.query()
    .eager({ interlocutor: true })
    .where({ from: id });
  res.json(channels);
};
