var express = require('express');
var router = express.Router();
const { DateTime } = require('luxon');

function format(date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
}

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Message Board', messages: messages });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'New Message' });
});

router.post('/new', function(req, res, next) {
  messages.push({
    text: req.body.message,
    user: req.body.username,
    added: format(new Date())
  });

  res.redirect('/');
});

module.exports = router;
