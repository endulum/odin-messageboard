const express = require('express')
const router = express.Router()

const { 
  getMessages, getNewMessageForm, postNewMessage 
} = require('../controllers/messageController')

router.get('/', getMessages)
router.get('/new', getNewMessageForm)
router.post('/new', postNewMessage)

module.exports = router;
