const Quote = require('../models/quote');

exports.getAllQuotes = function(request, response) {
  Quote.getAllQuotes( (res,error) => {
    if(error) { console.error(error)}
    response.json(res);
  })
};

exports.postNewQuote = function(request, response) {
  var newQuote = new Quote(request.body.author, request.body.text)
  newQuote.save(request.body.author,request.body.text);
  response.status(201).json(newQuote.text);
};

exports.getOneQuote = function(request, response) {
  Quote.getOneQuote( request.params.name,(res,error) => {
    if(error) { console.error(error)}
    response.json(res);
  })
 };

exports.deleteOneQuote = function(request, response) {
  Quote.deleteQuote(request.params.name)
  response.sendStatus(200);
};


exports.invalidURL = function(req, res) {
  res.redirect(301, '/quotes');
};
