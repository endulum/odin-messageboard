const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const { DateTime } = require('luxon')

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: format(new Date()),
  }, {
    text: 'Hello, world!',
    user: 'Charles',
    added: format(new Date())
  }
]

function format(date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
}

const getMessages = asyncHandler(async (req, res) => {
  return res.render('pages/messages', { 
    title: 'Message Board', 
    messages: messages 
  })
})

const getMessage = asyncHandler(async (req, res, next) => {
  const message = messages[req.params.index]
  if (!message) return next(createError(404, 'Message not found.'))
  res.locals.message = message
  return res.render('pages/message', { title: 'Viewing Message' })
})

const getNewMessageForm = asyncHandler(async (req, res) => {
  return res.render('pages/newMessage', { title: 'New Message' })
})

const postNewMessage = asyncHandler(async (req, res) => {
  messages.unshift({
    text: req.body.message,
    user: req.body.username,
    added: format(new Date())
  });
  return res.redirect('/messages')
})

module.exports = { getMessages, getMessage, getNewMessageForm, postNewMessage }