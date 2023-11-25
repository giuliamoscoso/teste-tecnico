import express from "express";
const cors = require("cors");

import { LoginController } from "./modules/Login/LoginController";

const app = express();
const loginController = new LoginController();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
    return response.json({ message: "Hello World!" });
});

app.post("/login", loginController.handle);

app.listen(3000, () => {
    console.log("Server is running!");
});
