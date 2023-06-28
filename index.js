import express from "express";
import morgan from "morgan";
import { kunal, Swaraj, Anu, Krishnan, Abhi } from './controllers/All-Controllers.js';
import router from './routes/UserRoutes.js';
import mongoose from "mongoose";
import { CronJob } from "cron";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

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


var job = new CronJob('*/1 * * * *', () => {
    console.log("Excecuted in cron job;..")
})
job.start();




app.get("/ping", (req, res) => {
    return res.send("pong")
})









mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));


app.listen(process.env.PORT, () => console.log("Working on port 8000")); // port