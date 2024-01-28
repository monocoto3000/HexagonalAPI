import express from "express";
import { Signale } from "signale";

import { loadRouter } from "./event/LoadRouter";
import { messageRouter } from "./messages/infrastructure/MessageRouter";
import { UserRouter } from "./user/infrastructure/UserRouter";

const app = express();
app.disable("x-powered-by");

const signale = new Signale();

app.use(express.json());
app.use("/messages", messageRouter);
app.use("/users", UserRouter);
app.use("/load", loadRouter);

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
