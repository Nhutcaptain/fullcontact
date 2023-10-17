const express = require('express');
const cors = require("cors");

const contactsRouter = require("./app/routes/contact.route")

const ApiError = require("./app/api-error");

//const creatError = require('http-errors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "wellcome to contact book aplication."});
});


app.use("/api/contacts", contactsRouter); //Khi tới đường dẫn này rồi mới sử dụng file contact.route.js


app.use((req, res, next) => {
   const a = new ApiError(404,"Not found!");
   console.log(a);
   next(a);
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.statusCode || 500 ,
        message: err.message,
    });
});

module.exports = app;