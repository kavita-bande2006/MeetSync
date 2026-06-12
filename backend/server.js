import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import {connectToSocket} from "./src/controllers/socketManager.js";

import cors from "cors";
import usersRoutes from "./src/routes/usersRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb",extended: true}));

app.use("/api/v1/users",usersRoutes);


const start = async () => {
    app.set("mongo_user")
    const connectDb = await mongoose.connect("mongodb://kavitabande2006_db_user:2yJk6TTI8IF1W2GZ@ac-bhyh9hr-shard-00-00.wdua9kp.mongodb.net:27017,ac-bhyh9hr-shard-00-01.wdua9kp.mongodb.net:27017,ac-bhyh9hr-shard-00-02.wdua9kp.mongodb.net:27017/?ssl=true&replicaSet=atlas-1l6m7e-shard-0&authSource=admin&appName=Cluster1");
    console.log("connect successefully");
    server.listen(app.get("port"),() => {
        console.log("LISTENING TO THE PORT 8000")
    });
}

start();