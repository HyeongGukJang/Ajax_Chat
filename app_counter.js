const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

let cnt = 0;
app.get("/count", (req, res) => {
    cnt++;
    let date = new Date();
    let result = {
        "timeStr": date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
        "cnt": cnt
    }
    res.end(JSON.stringify(result));
});

app.get('/receive', (req, res)=>{
    var size = parseInt(req.query.size);
    if(cnt > size) {
        let date = new Date();
        let result = {
            "timeStr": date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
            "cnt": cnt
        }
        res.end(JSON.stringify(result));
    } else {
        res.end("");
    }
});

const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("http://localhost:3000");
});