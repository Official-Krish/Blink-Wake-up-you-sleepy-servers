import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { PollingRouter } from "./routes/pollingRouter";
import { NotificationRouter } from "./routes/sendNoti";
import { WebsiteRouter } from "./routes/WebsiteRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/ping", PollingRouter);
app.use("/api/v1", NotificationRouter);
app.use("/api/v1/website", WebsiteRouter);

app.listen(8000, () => {
    console.log("Server is running on port 3000");
});