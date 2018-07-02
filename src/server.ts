require("dotenv").config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from "cors";

const app = express();

app.set("x-powered-by", false);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', require('./routes/user').default);

app.listen(process.env.PORT || 3000);

process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
