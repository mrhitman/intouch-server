import { Friend } from '../../models/friend';

export default async (req, res, next) => {
    const id = parseInt(req.params.id);
    const friend_user_id = parseInt(req.params.friend_user_id);

    if (id === friend_user_id) {
        return next(new Error(`Can't follow to your self`));
    }

    const isFollowed = await Friend
        .query()
        .where({ user_id: id, friend_user_id })
        .first();

    
    if (isFollowed) {
        return next(new Error(`User:${id} already followed to user:${friend_user_id}`));
    }

    await Friend
        .query()
        .insert({ user_id: id, friend_user_id, deleted: 0 });

    res.json({ success: true });
};
