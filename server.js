const express = require("express");
const app = express();
const server = require("http").Server(app);
app.set("view engine", "ejs");
app.use(express.static("public"));

const { v4: uuidv4 } = require("uuid");

app.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
    res.render("index", { roomId: req.params.room });
});

const io=require("socket.io")(server,{cors:{origin:"*"}})

io.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        io.emit("create_message",message)

    })
})

server.listen(3030);