const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const static = require("serve-static");
const path = require("path");

app.use(cors());
app.use('/public', static(path.join(__dirname, "public")));

var msgArr = [];
app.get("/send", (req, res) => {
    //console.log(req.query.sender, req.query.message);
    msgArr.push({
        "sender": req.query.sender, 
        "message": req.query.message
    });
    res.end();
});

app.get('/receive', (req, res)=>{
    var size = parseInt(req.query.size);
    if(msgArr.length>size) {
        // size보다 더 추가된 만큼만 잘라서 전송한다.
        var resObj = {
            total: msgArr.length,
            newMsg: msgArr.slice(size)
        }
        res.end(JSON.stringify(resObj));
    } else {
        res.end();
    }
});

const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("http://localhost:3000");
});