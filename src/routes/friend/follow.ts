import HttpError from "../../error";
import { Friend } from "../../models/friend";

export default async (req, res, next) => {
  const { id, friend_id } = req.body;

  if (id === friend_id) {
    return next(new HttpError(`Can't follow to your self`, 400));
  }

  const isFollowed = await Friend.query()
    .where({ user_id: id, friend_user_id: friend_id })
    .first();

  if (isFollowed) {
    return next(
      new HttpError(`User:${id} already followed to user:${friend_id}`, 400)
    );
  }

  await Friend.query().insert({
    user_id: id,
    friend_user_id: friend_id,
  });

  res.json({ success: true });
};
