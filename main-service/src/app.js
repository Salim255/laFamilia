const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const xss = require("xss-clean");

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const hpp = require("hpp");

const AppError = require("./utils/appError");

const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/users");

const postRouter = require("./routes/posts");

const chatRouter = require("./routes/chats");

const commentRouter = require("./routes/comments");

const messageRouter = require("./routes/messages");

const chatUserRouter = require("./routes/chatUsers");

const options = {
  origin: "*",

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

module.exports = () => {
  const app = express();
  app.use(cors(options));
  // 1) Global middleware
  //Set security HTTP headers,The best use of helmet is to use t early in middleware stack
  app.use(helmet());

  //Development logging, we use morgan to log the http method, the url, status code, the time it took to response , the response in bit
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  //Limit request from same IP This will allow 100 requests from the same IP in one hour
  /* const limiter = rateLimit({
    max: 100, //Max 100 request par hour
    windowMs: 60 * 60 * 1000, //Time in millisecond
    message: "Too many requests from this IP, please try again in an hour",
  });
 */
  //app.use("/api", limiter);

  //Body parser, reading data from body into req.body
  app.use(express.json({ limit: "10kb" }));

  //Data sanitization against XSS attacks
  //This will clean any user input from malicious HTML code with some JavaScript code attached to it .
  // So xss module will convert any HTML symbols into HTML entity
  //Like  "<div id=`bad`>Bad</div>" =>  "&lt;div id=`bad`>Bad&lt;/div>"

  app.use(xss());

  //Prevent params pollution, by clearing up the query string
  //If in the params there are key with two values, then this middleware, keep the first the last value and the key only, so there will be no key with two values
  //But if we want to allow the duplication in the queryString, we can pas a whiteList to the middleware where we allow to certain key to be duplicated
  /*  app.use(
    hpp({
      whitelist: ["duration","salim",...],
    }),
  ); */

  app.use(hpp());

  app.use("/api/v1/users", userRouter);

  app.use("/api/v1/posts", postRouter);

  app.use("/api/v1/chats", chatRouter);

  app.use("/api/v1/chatUsers", chatUserRouter);

  app.use("/api/v1/comments", commentRouter);

  app.use("/api/v1/messages", messageRouter);

  //For all https method
  app.all("*", (req, res, next) => {
    console.log("all routes");
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  //Global Errors middleware handler
  app.use(globalErrorHandler);

  return app;
};
