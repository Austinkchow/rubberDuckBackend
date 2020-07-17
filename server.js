//imports
const express = require('express');
const session = require('express-session');
const cors = require('cors')
const routes = require('./routes')

const PORT = process.env.PORT || 4000;
const app = express();
const MongoStore = require('connect-mongo')(session);

//middleware session
app.use(
    session({
        store: new MongoStore({
            url: process.env.MONGODB_URI || 'mongodb://localhost:27017/interview',
        }),
        secret: "RubberDuck",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

//middleware JSON parsing
app.use(express.json());

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(cors(corsOption));

//middleware - API routes
app.use('/api/v1/questions', routes.questionSets)
app.use('/api/v1/auth', routes.users)

//connection
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
