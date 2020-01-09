const express = require("express");
      compression = require("compression");
      session = require("express-session");
      bodyParser = require("body-parser");
      lusca = require("lusca");
      mongo = require("connect-mongo");
      mongoose = require("mongoose");
      secrets = require("./utils/secrets");
      errorHandler = require("errorhandler");
      cors = require("cors");

const MongoStore = mongo(session);

// Create Express server
const app = express();

app.use(cors());

// Connect to MongoDB
const mongoUrl = secrets.MONGODB_URI;

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

mongoose.connect(mongoUrl, options).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
if(!secrets.isProd) {
    app.use(errorHandler());
}
app.use(require('./routes'));

module.exports = app;