import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";
import HttpError from "../../error";
import { RefreshToken } from "../../models/refresh-token";
import { Profile } from "../../models/profile";

export default async (req, res, next) => {
  const { email, password } = req.body;

  let hash = crypto.createHmac("sha256", process.env.SALT);
  hash.update(password);

  const user = await Profile.query()
    .findOne({ email, password: hash.digest("hex") });

  if (!user) {
    return next(new HttpError(`No such user`, 403));
  }
  const token = jwt.sign({ id: user.id }, process.env.SALT, {
    expiresIn: "1h"
  });

  let refreshToken = await RefreshToken.query().findOne({ user_id: user.id });

  if (!refreshToken) {
    refreshToken = await RefreshToken.query()
      .insertAndFetch({ user_id: user.id, token: uuid() })
      .execute();
  }

  res.json({
    token,
    refreshToken: refreshToken.token,
    user
  });
};
