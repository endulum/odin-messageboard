const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const { DateTime } = require('luxon')
const db = require('../db/queries')

function format(date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
}

const getMessages = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages()
  return res.render('pages/messages', { 
    title: 'Message Board', 
    messages: messages.map(message => ({ ...message, date: format(message.date) }))
  })
})

const getMessage = asyncHandler(async (req, res, next) => {
  const message = (await db.getMessageById(req.params.id))[0]
  if (!message) return next(createError(404, 'Message not found.'))
  return res.render('pages/message', { 
    title: 'Viewing Message',
    message: { ... message, date: format(message.date) }
  })
})

const getNewMessageForm = asyncHandler(async (req, res) => {
  return res.render('pages/newMessage', { title: 'New Message' })
})

const postNewMessage = asyncHandler(async (req, res) => {
  await db.insertMessage(req.body.username, req.body.message)
  return res.redirect('/messages')
})

module.exports = { 
  getMessages, getMessage, getNewMessageForm, postNewMessage
}