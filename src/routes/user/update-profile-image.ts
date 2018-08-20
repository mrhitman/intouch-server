import * as fs from 'fs';
import { promisify } from 'util';
import { Profile } from '../../models/profile';
import { info, crop } from 'easyimage';

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
    const { x, y, width, height } = req.body;
    const photo = req.files.photo;
    try {
        if (await access(`images/${profile.photo}`, fs.constants.F_OK)) {
            await unlink(`images/${profile.photo}`);
        }
        await profile
            .$query()
            .update({ photo: `profile_${profile.user_id}.png` });
        await photo.mv(`images/origin_${profile.photo}`);
        const imageInfo = await info(`images/origin_${profile.photo}`);
        await crop({
            src: `images/origin_${profile.photo}`,
            dst: `images/${profile.photo}`,
            x: (x * imageInfo.width) / 100,
            y: (y * imageInfo.height) / 100,
            cropHeight: (height * imageInfo.width) / 100,
            cropWidth: (width * imageInfo.height) / 100,
        });
        res.json('success');
    } catch (err) {
        return res
            .status(500)
            .send(err);
    }
};
