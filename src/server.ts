import express from "express";
import { Signale } from "signale";

import { loadRouter } from "./event/LoadRouter";
import { productRouter } from "./product/infrastructure/ProductRouter";
import { messageRouter } from "./messages/infrastructure/MessageRouter";

const app = express();

const signale = new Signale();

app.use(express.json());
app.use("/products", productRouter);
app.use("/messages", messageRouter);
app.use("/load", loadRouter);

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
