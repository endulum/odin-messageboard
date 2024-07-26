const asyncHandler = require('express-async-handler')
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
  return res.render('index', { title: 'Message Board', messages: messages })
})

const getNewMessageForm = asyncHandler(async (req, res) => {
  return res.render('new', { title: 'New Message' })
})

const postNewMessage = asyncHandler(async (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.username,
    added: format(new Date())
  });
  return res.redirect('/')
})

module.exports = { getMessages, getNewMessageForm, postNewMessage }