const express = require("express");
const fs = require("fs");
const app = express();
const axios = require("axios");

const PORT = process.env.PORT || 5000;

setInterval(() => {
    axios
        .get("https://genesis-chat-box.herokuapp.com")
        .then(() => {})
        .catch(() => {});
}, 600000);

app.get("/log", async (req, res) => {
    // add time and number of users
    fs.readFile("analytics.json", "utf8", (err, data) => {
        if (err) return res.status(500).send("bad!");
        data = JSON.parse(data);

        if(Date.now() - data[data.length - 1] < 3600) {
            data[data.length - 1].users += 1;
        }
        else {
            const obj = {
                time: Date.now(),
                users: 1
            }
            data.push(obj);
        }
        
        fs.writeFile("contacts.json", JSON.stringify(data), (err) => {
            if (err) return res.status(500).send("bad!");
            return res.status(201).send("successful");
        });
    });
});

app.get("/", (req, res) => {
    res.send("yo!")
})

app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}`);
});
