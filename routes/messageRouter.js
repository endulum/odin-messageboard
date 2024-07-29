const express = require('express')
const messageRouter = express.Router()

const { 
  getMessages, getNewMessageForm, postNewMessage, getMessage, getDBLogTest
} = require('../controllers/messageController')

messageRouter.get('/', getMessages)
messageRouter.get('/new', getNewMessageForm)
messageRouter.post('/new', postNewMessage)
messageRouter.get('/db', getDBLogTest) // remove
messageRouter.get('/:index', getMessage)

module.exports = messageRouter;
