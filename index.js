import express from "express";
import morgan from "morgan";
import { kunal, Swaraj, Anu, Krishnan, Abhi } from './controllers/All-Controllers.js';
import router from './routes/UserRoutes.js';
import mongoose from "mongoose";

const app = express();

app.use(morgan('dev')); // use() - middleware
app.use(express.json()); // data to parse
app.use('/api/v1', router);


mongoose.connect('mongodb+srv://swaraj1920:swaraj1920@cluster0.6yd9l.mongodb.net/awdizDB?retryWrites=true&w=majority')
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB Error => ", err));


app.listen(8001, () => console.log("Working on port 8001")); // port