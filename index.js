import express from "express";
import morgan from "morgan";
import { kunal, Swaraj, Anu, Krishnan, Abhi } from './controllers/All-Controllers.js';
import router from './routes/UserRoutes.js';
import mongoose from "mongoose";
import { CronJob } from "cron";

const app = express();

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




app.get("/hi", (req, res) => {
    return res.send("hello")
})









mongoose.connect('mongodb+srv://swaraj1920:swaraj1920@cluster0.6yd9l.mongodb.net/awdizDB?retryWrites=true&w=majority')
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));


app.listen(8000, () => console.log("Working on port 8000")); // port