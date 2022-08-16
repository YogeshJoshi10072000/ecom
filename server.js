const express=require('express');
const cors=require('cors');
const app=express();
const multer = require("multer");
const path=require('path');
const PORT=process.env.PORT||4000;
const dotenv=require('dotenv');
const userrouter=require('./Routes/userRoutes');
const postroutes=require('./Routes/PostRoutes');
const conversationroutes=require('./Routes/Conversation');
const messageroutes=require('./Routes/MessageRoutes');

// const socket=require('./socket.js');
// if (process.env.NODE_ENV !== 'production') {
  // require('dotenv').config({ path: 'backend/config/config.env' });
  dotenv.config();
// }




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use("/api/user",userrouter);
app.use("/api/post",postroutes);
app.use("/api/conversation",conversationroutes);
app.use("/api/messages",messageroutes);
// app.use('/message',socket);
// const port = 3000;
const connectdb=require('./database');
connectdb();



app.use("/images", express.static(path.join(__dirname, "public/images")));
console.log(path.join(__dirname), "/public/images")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname)+"/public/images");
  },
  
  filename: (req, file, cb) => {
    cb(null,req.body.name);
  },
});

const upload = multer({ storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});






// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })





const server=app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
// console.log(process.env.NODE_ENV);


const io = require("socket.io")(server, {
  cors: {
    origin: `http://localhost:${process.env.PORT}`,
  },
});

  // console.log("hello socket io");
    let users = [];
  
  const addUser = (userid, socketId) => {
    !users.some((user) => user.userid === userid) &&
      users.push({ userid, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userid) => {
    return users.find((user) => user.userid === userid);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    // console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userid) => {
      addUser(userid, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
     if(user)
     {

      
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });

    }
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      // console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });



__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}
