import { ChatMessage } from "../../models/chat-message";

export default async (req, res) => {
  const { from, to } = req.params;
  const messages = await ChatMessage.query()
    .where({ from, to })
    .orWhere({ from: to, to: from });
  res.json(messages);
};
