import { Post } from "../../models/post";
import { map } from "lodash";
import { Profile } from "../../models/profile";

export default async (req, res) => {
  const { id } = req.params;
  const posts = await Post.query()
    .eager("[meta]")
    .where({ owner_id: id });
  const authors = await Profile.query().findByIds(map(posts, "author_id"));

  res.json({
    posts,
    authors
  });
};
