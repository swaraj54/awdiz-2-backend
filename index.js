import express from "express";
import morgan from "morgan";
import { kunal, Swaraj, Anu, Krishnan, Abhi } from './controllers/All-Controllers.js';
import router from './routes/UserRoutes.js';
import mongoose from "mongoose";
import { CronJob } from "cron";
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

const __dirname = path.resolve();

app.use((err, req, res, next) => {
    console.log("Inside error middleware!!!")
    if (err) {
        return res.send(err)
    } else {
        next();
    }
})

// app.use((req, res, next) => {

//     console.log("Inside application level middleware");
//     if (false) {
//         return res.send("Sending from middleware")
//     } else {
//         next();
//     }
// })


app.use(morgan('dev')); // use() - middleware
app.use(express.json()); // data to parse

const myCustomMiddleware = (req, res, next) => {
    console.log("Insdie custom middleware")
    next();
}

app.use(myCustomMiddleware)

app.use('/api/v1', router);


// var job = new CronJob('* * */7 * *', () => {
//     console.log("Excecuted in cron job;..")
// })
// job.start();




app.get("/ping", (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
})


app.get("/urlencoded", (req, res) => {
    res.send(
        `<form method='post' action='/login'>
            <input name="email" placeholder="text" />
            <input name="password"  placeholder="password"/>
            <input type='submit' value="LOgin"/>
        </form>`
    )
})

app.post('/login', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    // db store 
    res.send(`Your email ${req.body.email} and passsword is ${req.body.password}`)
})





mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));


app.listen(process.env.PORT, () => console.log("Working on port 8000")); // port