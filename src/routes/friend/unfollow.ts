import { Friend } from '../../models/friend';

export default async (req, res, next) => {
    const id = parseInt(req.params.id);
    const friend_user_id = parseInt(req.params.friend_user_id);

    if (id === friend_user_id) {
        return next(new Error(`Can't unfollow to your self`));
    }

    const follow = await Friend
        .query()
        .where({ user_id: id, friend_user_id })
        .first();

    
    if (!follow) {
        return next(new Error(`User:${id} isn't followed to user:${friend_user_id}`));
    }

    await follow
        .$query()
        .delete()
        .where({ user_id: id, friend_user_id });

    res.json({ success: true });
};
