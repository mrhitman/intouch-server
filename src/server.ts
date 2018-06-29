import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from "typeorm";

const app = express();

createConnection({
    type: "postgres",
    host: "localhost",
    username: "root",
    password: "1",
    database: "root",
    synchronize: true
}).catch((err) => {
    global.console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', require('./routes/user').default);

app.listen(process.env.PORT || 3000);