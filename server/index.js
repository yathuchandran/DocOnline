const express = require("express");
const cors = require("cors");
const app = express(); // Use express() to create an instance of the Express app
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorRoute");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/config");
const cloudinary =require ('cloudinary') ;
const bodyParser=require('body-parser')
const {Server}=require('socket.io')
const socketManager=require('./config/socket')

// MongoDB connection
connectDB();

// Dotenv config
dotenv.config();
      
cloudinary.v2.config({ 
  cloud_name: 'dyvmqs56r', 
  api_key: '662229676537357', 
  api_secret: 'Cy34_Payi7dgrEpREF5-TTHvugM' ,
  max_file_size:50000000
});

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware
app.use('/webhook', express.raw({ type: 'application/json' }));


app.use(express.json());
app.use(express.urlencoded({ extended: true,limit:"500mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: 'https://online-doc-client.vercel.app/',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(function(req, res, next) {
  res.header('Cache-Control', 'no-cache, no-store');
  next();
});

// Register partial route setup
app.use(express.static(__dirname + '/public'));
app.use("/images", express.static("images"));

// Routes
app.use("/", userRoute);
app.use("/doctor", doctorRoute);
app.use("/admin", adminRoute);


const PORT = process.env.PORT || 5051;

const server= app.listen(PORT, function () {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

const io = new Server(server, { cors: true });


const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
