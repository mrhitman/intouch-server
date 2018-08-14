require("dotenv").config();

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import * as passport from 'passport';
import Chat from './services/chat';


const app = express();
const server = http.createServer(app);

new Chat(server);
app.set("x-powered-by", false);
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./middlewares/passport').default(passport);

app.use('/chat', require('./routes/chat').default);
app.use('/user', require('./routes/user').default);
app.use('/friend', require('./routes/friend').default);
app.get('//', (_, res) => {
    res.json('ok');
});

app.use((err, req, res, next) => {
    res.status(400);
    res.json({ error: err.message });
});

server.listen(process.env.PORT || 3000, () => console.log('server up'));

process.on("unhandledRejection", (reason, p) => {
    global.console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
