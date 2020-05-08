const express = require("express");
const helmet = require("helmet");
const server = express();

const projectsRouter = require("../projects/projects-server");
const actionsRouter = require("../actions/actions-router");

server.use(express.json());
server.use(helmet());


server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
