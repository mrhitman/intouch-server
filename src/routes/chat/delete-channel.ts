import { Channel } from "../../models/channel";

export default async (req, res) => {
    const id = req.params.id;
    await Channel
        .query()
        .delete()
        .where({ from: id });
    res.json('ok');
};
