const express = require('express');
const app = express();
const cors = require('cors');
const { errors } = require('celebrate');

app.use(cors({
    "origin": "http://localhost:3000",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    return next();
});

app.use("/api", require("./routes"));
app.use(errors());

app.listen(process.env.PORT || 3333, () => console.log('HTTP SERVER RUNNING!'));