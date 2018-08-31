import { Profile } from "../../models/profile";

export default async (req, res) => {
  const id = req.params.id;
  const user = await Profile.query().findById(id);
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
};
