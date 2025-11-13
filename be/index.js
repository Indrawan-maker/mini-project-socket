import http from "http";
import cors from "cors"
import { Server } from "socket.io"
import express from "express"

const app = express()

app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    },
})

io.on("connection", (socket) => {
    console.log("koneksi berhasil dari: io connection" , socket.id)
})

app.post("/", (req, res) => {
    const {judul, isi} = req.body


    io.emit("halo", {judul, isi})
    res.json({succes: true})
})

server.listen(4000, () => console.log("server is running"))