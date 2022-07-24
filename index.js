const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const postRouter = require('./Routes/posts')
const dotenv = require("dotenv");
const swaggerUI =require('swagger-ui-express')
const swaggerJsDoc  =require("swagger-jsdoc")

const PORT = process.env.PORT || 8000;
dotenv.config();

const app = express();


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:8000",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./Routes/*.js"],
};


app.use(morgan("dev"));
app.use(cors());

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/posts", postRouter);

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));