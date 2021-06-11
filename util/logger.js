const { createLogger, transports } = require("winston");
// require("winston-mongodb");

const errorLog = createLogger({
  transports: [new transports.File({ filename: "errors.log" })],
});

const accessLog = createLogger({
  transports: [
    new transports.File({ filename: "access.log" }),
    // new transports.MongoDB({
    //   db: "mongodb+srv://norm:yZ7YiYbFiRBYDIqh@cluster0.c5muj.mongodb.net/vidly?retryWrites=true&w=majority",
    //   level: "info",
    // }),
  ],
});

module.exports = {
  errorLog: errorLog,
  accessLog: accessLog,
};
