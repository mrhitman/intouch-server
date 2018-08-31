import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";
import HttpError from "../../error";
import { RefreshToken } from "../../models/refresh-token";

export default async (req, res, next) => {
  const { token } = req.body;
  let refreshToken = await RefreshToken.query().findOne({ token });

  if (!refreshToken) {
    return next(new HttpError("Invalid refresh token", 404));
  }

  await refreshToken
    .$query()
    .update({ token: uuid() })
    .execute();

  const newToken = jwt.sign({ id: refreshToken.user_id }, process.env.SALT, {
    expiresIn: "1h"
  });

  res.json({
    token: newToken,
    refreshToken: refreshToken.token
  });
};
