import HttpError from "../../error";
import { Friend } from "../../models/friend";

export default async (req, res, next) => {
  const { id, friend_id } = req.body;

  if (id === friend_id) {
    return next(new HttpError(`Can't unfollow to your self`, 400));
  }

  const follow = await Friend.query()
    .where({ user_id: id, friend_user_id: friend_id })
    .first();

  if (!follow) {
    return next(
      new HttpError(`User:${id} isn't followed to user:${friend_id}`, 400)
    );
  }

  await follow
    .$query()
    .delete()
    .where({ user_id: id, friend_user_id: friend_id });

  res.json({ success: true });
};
