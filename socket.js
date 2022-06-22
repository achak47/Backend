const io = require("socket.io")(8900||process.env.PORT, {
    cors: {
      origin: ["http://localhost:5000"],
    },
  });
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  io.on("connection", (socket) => {  
    //when connect
    console.log("a user connected.");
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => { 
      const user = getUser(receiverId);                            
      console.log(users);
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });  
    });
    //io.emit("welcome","Welcome to socket server") ; // T send this to all the users
    socket.on("addUser", userId => {
      console.log("Added an user");
      addUser(userId, socket.id);
      io.emit("getUsers", users);  //sending to all the clients who are connected in the socket , including the client
    })                             // who initially sent the request , ie including the sender
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    })
  });
  