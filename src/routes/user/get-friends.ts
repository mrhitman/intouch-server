import { map, filter, intersection } from "lodash";
import { User } from "../../models/user";
import { Friend } from "../../models/friend";

export default async (req, res, next) => {
  const id = parseInt(req.params.id);

  const friends = await Friend.query()
    .where({ user_id: id })
    .orWhere({ friend_user_id: id });

  const followerIds = filter(
    map(friends, "user_id"),
    user_id => user_id !== id
  );
  const followingIds = filter(
    map(friends, "friend_user_id"),
    user_id => user_id !== id
  );
  const friendIds = filter(
    intersection(followerIds, followingIds),
    user_id => user_id !== id
  );

  const users = await User.query()
    .eager({ profile: true })
    .whereNot({ id })
    .whereIn("id", followerIds)
    .orWhereIn("id", followingIds);

  const recommendUsers = await User.query()
    .eager({ profile: true })
    .whereNot("id", id)
    .whereNotIn("id", followerIds)
    .whereNotIn("id", followingIds);

  res.json({
    followers: filter(
      users,
      user =>
        followerIds.lastIndexOf(user.id) !== -1 &&
        friendIds.lastIndexOf(user.id) === -1
    ),
    followings: filter(
      users,
      user =>
        followingIds.lastIndexOf(user.id) !== -1 &&
        friendIds.lastIndexOf(user.id) === -1
    ),
    friends: filter(users, user => friendIds.lastIndexOf(user.id) !== -1),
    recommendUsers
  });
};
