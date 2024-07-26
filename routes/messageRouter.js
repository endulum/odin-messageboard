const express = require('express')
const messageRouter = express.Router()

const { 
  getMessages, getNewMessageForm, postNewMessage 
} = require('../controllers/messageController')

messageRouter.get('/', getMessages)
messageRouter.get('/new', getNewMessageForm)
messageRouter.post('/new', postNewMessage)

module.exports = messageRouter;
