const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    },
});

io.listen(8080);

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("join-room", (room) => {
        socket.join(room);
        console.log("Join room " + socket.id + " to room " + room);
    });
    socket.on("add-song", (data) => {
        const roomId = data.roomId;
        const userId = data.userId;
        const link = data.link;
        console.log("New song:", data.roomId, data.userId, data.link);
        socket.to(roomId).emit("new-song", data);
    });
});
