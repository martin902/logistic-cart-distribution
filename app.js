const express = require("express");
const app = express();
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/kalk.html");
});
app.listen(3000, function () {
    console.log("Server is running on localhost:3000");
});