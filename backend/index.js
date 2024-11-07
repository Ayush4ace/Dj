import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/database.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js"
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js"
dotenv.config({});
const app = express();
// middlewares 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

app.use(cors(corsOptions));



const PORT = process.env.PORT || 5000;

// Apis

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

// http//localhost:8080/api/v1/user/


app.listen(PORT, ()=>{
    console.log(`server is listening on the port ${PORT}`);
    connectDb();
})