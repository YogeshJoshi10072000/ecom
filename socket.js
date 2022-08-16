const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: "http://localhost:3000",
  },
});

  console.log("hello socket io");
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
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userid) => {
      addUser(userid, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });