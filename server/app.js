const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id, time) => ({name, text, id, time})

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('error data')
    }
    socket.join(data.room)
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room,
      image: data.image
    })
    cb({userId: socket.id})
    io.to(data.room).emit('updateUsers',  users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Welcome ${data.name}`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Profile ${data.name} logged in.`))
  })
  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('text cannot be empty')
    }
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id, data.time))
    }
    cb()
  })
  socket.on('deleteMessage', (del, cb) => {
    if (!del.text) {
      return cb('nothing for delete')
    }
    const user = users.get(del.id)
    if (user) {
      io.to(user.room).emit('clearMessage', m(del.id ,del.text))
    }
    cb()
  })
  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        m('admin', `Profile ${user.name} logged out.`)
      )
    }
    cb()
  })
  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers',  users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Profile ${user.name} logged out.`))
    }
  })
})

module.exports = {
  app,
  server
}
