const express = require("express");
const helmet = require("helmet");
const server = express();

const projectsRouter = require("../projects/projects-server");

server.use(express.json());
server.use(helmet());

server.use("/api/projects", projectsRouter);
server.use("/", (req, res) => {
  res.json({ message: "Welcome to the sprint challenge" });
});

module.exports = server;
