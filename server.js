const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')
const server = express();
server.use(logger, express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware just making a change for lambda forms

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}]: ${req.method} : http://localhost:4000${req.url}`)
  next()
}

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)
module.exports = server;
