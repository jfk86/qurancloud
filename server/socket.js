const { Server } = require('socket.io');

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinSession', (sessionId) => {
      socket.join(sessionId);
      console.log(`Socket ${socket.id} joined session ${sessionId}`);
    });

    socket.on('updateStatus', (data) => {
      io.to(data.sessionId).emit('statusUpdated', data);
    });

    socket.on('updateQueue', (data) => {
      io.to(data.sessionId).emit('queueUpdated', data);
    });

    socket.on('rearrangeSeats', (data) => {
      io.to(data.sessionId).emit('seatsRearranged', data);
    });

    socket.on('shyStudentCalled', (data) => {
      io.to(data.sessionId).emit('shyStudentCalled', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}

module.exports = { initializeSocket };
