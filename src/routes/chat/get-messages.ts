import { Message } from "../../models/message";

export default async (req, res) => {
    const { from, to } = req.params;
    const messages = await Message
        .query()
        .where({ from, to });
    res.json(messages);
};
