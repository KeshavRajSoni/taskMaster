//packages
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//routes
const taskRoutes = require('./routes/task/taskRoutes')
const userRoutes = require('./routes/user/userRoutes')

const dbSetup = require('./db/db_setup');
const express = require('express')

//initial code
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
dotenv.config({ path: './config.env' });
dbSetup();
// app.use(bodyParser.urlencoded({ extended: true }));
//task crud
//sign in out  logout
// user feth Task
//two middle wares protect restict





app.use(
    '/api/user',
    userRoutes
);
app.use(
    '/api/task',
    taskRoutes
);

app.listen(8080, () => { console.log("listning on port 8080"); });
