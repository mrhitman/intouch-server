import * as fs from 'fs';
import { promisify } from 'util';
import { Profile } from '../../models/profile';

const unlink = promisify(fs.unlink);
const access = promisify(fs.access);

export default async (req, res) => {
    const id = req.params.id;
    if (!req.files) {
        return res
            .status(400)
            .send('No files were uploaded.');
    }
    const profile = await Profile
        .query()
        .findById(id);
    if (!profile) {
        return res
            .status(404)
            .send('No such user found');
    }

    let photo = req.files.photo;
    try {
        if (await access(`images/${profile.photo}`, fs.constants.F_OK)) {
            await unlink(`images/${profile.photo}`);
        }
        await profile
            .$query()
            .update({ photo: `profile_${profile.user_id}.png` });
        await photo.mv(`images/${profile.photo}`);
        res.json('success');
    } catch (err) {
        return res
            .status(500)
            .send(err);
    }
};
