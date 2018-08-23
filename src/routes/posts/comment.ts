import * as moment from 'moment';
import { Meta } from '../../models/meta';
import { Post } from '../../models/post';
import { Profile } from '../../models/profile';

export default async (req, res) => {
    const post = await Post
        .query()
        .insert({
            author_id: req.body.author_id,
            owner_id: req.body.owner_id,
            header: req.body.header,
            content: req.body.content,
        });

    const meta = await Meta
        .query()
        .insert({
            item_id: post.id,
            likes: 0,
            dislikes: 0,
            views: 0,
            created_at: moment().format(),
        });
    post.meta = meta;
    res.json({
        post,
        author: await Profile.query().findById(post.author_id)
    });
};
