import { Meta } from '../../models/meta';
import { raw } from 'objection';


export default async (req, res) => {
    const { item_id, type } = req.body;
    const meta = await Meta
        .query()
        .updateAndFetchById(item_id, raw(`${type} = ${type} - 1`))
        .execute();
    res.json({ meta });
}
