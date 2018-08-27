require("dotenv").config();

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import * as http from 'http';
import * as morgan from 'morgan';
import * as passport from 'passport';
import jwtStrategy from './middlewares/passport';
import Chat from './services/chat';

function createServer() {
    const app = express();
    const server = http.createServer(app);

    new Chat(server);
    app.set("x-powered-by", false);
    app.use(cors());
    app.use(fileUpload());
    app.use(express.static('web'));
    app.use(express.static('images'));
    app.use(morgan('tiny'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(passport.initialize());
    jwtStrategy(passport);

    app.use('/chat', require('./routes/chat').default);
    app.use('/user', require('./routes/user').default);
    app.use('/friend', require('./routes/friend').default);
    app.use('/posts', require('./routes/posts').default);

    app.use((err, req, res, next) => {
        res.status(err.status || 400);
        res.json(err.message);
    });

    process.on("unhandledRejection", (reason, p) => {
        global.console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    });

    return app;
}

if (!module.parent) {
    createServer().listen(process.env.PORT || 3000, () => console.log('server up'));

}
export default createServer;
