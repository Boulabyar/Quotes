let quotes = [
  { author: 'einstein', text: 'Life is like riding a bicycle. To keep your balance you must keep moving' },
  { author: 'berners-lee', text: 'The Web does not just connect machines, it connects people' },
  { author: 'crockford', text: 'The good thing about reinventing the wheel is that you can get a round one' }
];

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
// Connection URI
const url = 'mongodb://localhost:27017/test'

module.exports = class Quote {
  constructor(author, text) {
    this.author = author;
    this.text = text;
  }
  save(text_author, text) {
    MongoClient.connect(url, function(err, database)  {
      const myDB = database.db('test')
      const collection = myDB.collection('quotes')

      if (err)  { console.error(error) ; }
      try{
        collection.insert([{'author':text_author,'text':text}], function(error, result)  {
          if (error) console.error(error)
          console.log(result)
        })
      }catch( exception){
        console.error(exception)
      }
    })
  }
  static getAllQuotes(callback) {
    MongoClient.connect(url, function(err, database)  {
      //callback function related to the connexion to MongoDB
      const myDB = database.db('test')
      const collection = myDB.collection('quotes')

      if (err)  { console.error(error) ;console.error(err) }
      try{
        collection.find(
          {},
          { fields: { _id: 0 }})
          .toArray((error, quotes) => {
            //Call back function related to the find query
            if (error)  {console.error(error) ; callback({},error)}
            let quotes_resp = quotes.reduce((obj, item) => (obj[item.author] = item.text, obj) ,{});
            callback(quotes_resp,{})
      })
      }catch( exception){
        callback([],exception)
      }
    })
  }
  static getOneQuote(text,callback) {
    MongoClient.connect(url, function(err, database)  {
      //callback function related to the connexion to MongoDB
      const myDB = database.db('test')
      const collection = myDB.collection('quotes')

      if (err)  { console.error(error) ;console.error(err) }
      try{
        collection.find(
          {"text": text},
          { fields: { _id: 0 }})
          .toArray((error, quotes) => {
            //Call back function related to the find query
            if (error)  {console.error(error) ; callback({},error)}
            let quotes_resp = quotes.reduce((obj, item) => (obj[item.author] = item.text, obj) ,{});
            callback(quotes_resp,{})
      })
      }catch( exception){
        callback({},exception)
      }
    })
  }
  static deleteQuote(text) {
    MongoClient.connect(url, function(err, database)  {
      const myDB = database.db('test')
      const collection = myDB.collection('quotes')

      if (err)  { console.error(error) ; }
      try{
        collection.remove({ text : text },
          function(error, result)  {
            if (error) console.error(error)
            console.log(`Removed the document where text = ${text}`)
        })

      }catch( exception){
        console.error(exception)
      }
    })  }
}
