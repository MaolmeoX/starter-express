import express from 'express';
import compression from 'compression';
import session from 'express-session';
import lusca from 'lusca';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import errorHandler from 'errorhandler';
import cors from 'cors';
import passport from 'passport';
import { MONGODB_URI, SESSION_SECRET, isProd } from './utils/secrets';

import appRouter from './routes';

const MongoStore = mongo(session);

// Create Express server
const app = express();

app.use(cors());

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

const options = {
    autoCreate: true,
    // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    // reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
};

mongoose
    .connect(mongoUrl, options)
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch(err => {
        console.log(
            `MongoDB connection error. Please make sure MongoDB is running. ${err}`
        );
        process.exit();
    });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true,
        }),
    })
);
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
if (!isProd) {
    app.use(errorHandler());
}

/*require('./config/passport');*/

app.use(passport.initialize());

app.use(appRouter);

export default app;
