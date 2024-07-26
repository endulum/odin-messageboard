const express = require('express')
const messageRouter = express.Router()

const { 
  getMessages, getNewMessageForm, postNewMessage, getMessage
} = require('../controllers/messageController')

messageRouter.get('/', getMessages)
messageRouter.get('/new', getNewMessageForm)
messageRouter.post('/new', postNewMessage)
messageRouter.get('/:index', getMessage)

module.exports = messageRouter;
