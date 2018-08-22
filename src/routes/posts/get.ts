import { Post } from "../../models/post";

export default async (req, res) => {
    const { id } = req.params;
    const posts = await Post
        .query()
        .eager('[meta,author]')
        .where({ owner_id: id })
    res.json(posts);
};