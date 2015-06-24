var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
router.get('/author', function(req, res) {
  res.render('author');
});

router.param('quizID', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizID(\\d+)', quizController.show);
router.get('/quizes/:quizID(\\d+)/answer', quizController.answer);

module.exports = router;
