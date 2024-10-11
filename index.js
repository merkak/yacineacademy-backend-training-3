import express from "express";
import userRouter from "./user/api.js";
import morganMiddleware from "./util/log/morgan.js";
import Logger from "./util/log/winston.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(morganMiddleware)

app.set("view engine", "ejs");

app.use('/user', userRouter);


app.use(express.static("public"));

app.listen(3000, () => {
  Logger.info("Server is running on http://localhost:3000");
});
