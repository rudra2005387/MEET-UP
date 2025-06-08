const signalingService = (io) => {
    const rooms = {};

    io.on('connection', (socket) => {
        console.log('New user connected:', socket.id);

        socket.on('join-room', (roomId, userId) => {
            if (!rooms[roomId]) {
                rooms[roomId] = { users: {} };
            }
            rooms[roomId].users[userId] = socket.id;
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);

            socket.to(roomId).emit('user-connected', userId);

            socket.on('disconnect', () => {
                delete rooms[roomId].users[userId];
                socket.to(roomId).emit('user-disconnected', userId);
                console.log(`User ${userId} disconnected from room ${roomId}`);
            });
        });

        socket.on('signal', (data) => {
            const { roomId, userId, signal } = data;
            socket.to(roomId).emit('signal', { userId, signal });
        });
    });
};

export default signalingService;