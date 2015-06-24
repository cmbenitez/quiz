var models = require('../models/models.js');


exports.load = function(req, res, next, quizID){
  models.Quiz.find(quizID).then(
      function(quiz){
          if (quiz){
              req.quiz = quiz;
              next();
          }else{
              next(new Error('No existe quizID=' + quizID));
          }
      }
  ).catch(function(error) {next(error);});
};

// GET /quizes

exports.index = function(req,res){
    var search = req.query.search || "";
    search = '%' + search + '%';
    search = search.replace(" ","%");
    models.Quiz.findAll(
        {where: ["pregunta like ?", search],
            order: 'pregunta'
        }
    ).then(
        function(quizes){
            res.render('quizes/index', {quizes:quizes});
        }
  ).catch(function(error) {next(error);});
};

// Get /quizes/:id

exports.show = function(req, res){
    res.render('quizes/show', {quiz:req.quiz});
};

// Get /quizes/:id/answer

exports.answer = function(req, res){
    var resultado = 'Incorrecto';
    if (req.query.respuesta == req.quiz.respuesta){
        resultado = 'Correcto';
    }else{

    }
    res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado});
};
