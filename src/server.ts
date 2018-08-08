require("dotenv").config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as WebSocket from 'ws';
import * as http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    ws.on('message', (message: string) => {
        ws.send(JSON.stringify({ text: 'ok' }));
    });

    ws.send(JSON.stringify({ text: 'Welcome to chat!' }));
});

app.set("x-powered-by", false);
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./middlewares/passport').default(passport);

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
