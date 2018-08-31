import * as fs from "fs";
import { promisify } from "util";
import { Profile } from "../../models/profile";
import { info, crop, resize } from "easyimage";

const unlink = promisify(fs.unlink);

export default async (req, res) => {
  const id = req.params.id;
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const profile = await Profile.query().findById(id);
  if (!profile) {
    return res.status(404).send("No such user found");
  }
  const { x, y, width, height } = req.body;
  const photo = req.files.photo;
  try {
    const filePath = `${__dirname}/../../../images`;
    await profile.$query().update({ photo: `profile_${profile.id}.png` });
    await photo.mv(`${filePath}/origin_${profile.photo}`);
    const imageInfo = await info(`${filePath}/origin_${profile.photo}`);
    await crop({
      src: `${filePath}/origin_${profile.photo}`,
      dst: `${filePath}/${profile.photo}`,
      x: (x * imageInfo.width) / 100,
      y: (y * imageInfo.height) / 100,
      cropHeight: (height * imageInfo.height) / 100,
      cropWidth: (width * imageInfo.width) / 100
    });
    await crop({
      src: `${filePath}/origin_${profile.photo}`,
      dst: `${filePath}/rect_${profile.photo}`,
      x: (x * imageInfo.width) / 100,
      y: (y * imageInfo.height) / 100,
      cropHeight: (height * imageInfo.height) / 100,
      cropWidth: (height * imageInfo.height) / 100
    });
    await resize({
      src: `${filePath}/${profile.photo}`,
      dst: `${filePath}/${profile.photo}`,
      height: 250,
      width: 200,
      ignoreAspectRatio: false
    });
    await resize({
      src: `${filePath}/rect_${profile.photo}`,
      dst: `${filePath}/mini_${profile.photo}`,
      height: 50,
      width: 50
    });
    await unlink(`${filePath}/rect_${profile.photo}`);
    res.json("success");
  } catch (err) {
    return res.status(500).send(err);
  }
};
