import amqp from "amqplib";
import express from "express";

const config = {
  protocol: "amqp",
  hostname: process.env.DB_HOST,
  port: 3000,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const loadRouter = express.Router();


loadRouter.get("/", async function loadEvent(req, res) {
  try {
    const conn = await amqp.connect(config);
    console.log("Conexión exitosa");
    const channel = await conn.createChannel();
    console.log("Canal creado exitosamente");
    channel.sendToQueue("InitialEvent", Buffer.from("Mensaje"));
    console.log("Mensaje enviado");
    await channel.close();
    await conn.close();
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error");
  }

});

