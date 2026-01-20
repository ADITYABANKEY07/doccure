import express from "express";
import cors from "cors";
import jsonServer from "json-server";

const app = express();
app.use(cors());

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("JSON Server running on port", PORT);
});
