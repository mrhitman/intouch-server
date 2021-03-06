import { Meta } from "../../models/meta";

export default async (req, res) => {
  const { item_id, type } = req.body;

  await Meta.query()
    .update({ [type]: Meta.raw(`${type} + 1`) })
    .where({ item_id })
    .execute();
  res.json("ok");
};
