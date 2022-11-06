// const http = require('http');
// const fs = require('fs')
// const url = require('url');
// const querystring = require('querystring');
// const figlet = require('figlet')
//this file is server side
// const server = http.createServer(function (req, res) {
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   console.log(params)
//   console.log(page);
//   if (page == '/') {
//     fs.readFile('index.html', function (err, data) {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/otherpage') {
//     fs.readFile('otherpage.html', function (err, data) {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/otherotherpage') {
//     fs.readFile('otherotherpage.html', function (err, data) {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/api') {

//     console.log("This is params['word']:", params['word'])
//     //-------------------Palindrome check---------------------


//     let isPalindrome = wordToCheck => wordToCheck.toLowerCase() === wordToCheck.split('').reverse().join('').toLowerCase()


//     // function isPalindrome(wordToCheck) {
//     //   return wordToCheck.toLowerCase() === wordToCheck.split('').reverse().join('').toLowerCase()

//     // }

//     if (isPalindrome(params['word'])) {
//       const objToJson = {
//         result: 'Its a Palindrome!'
//       }
//       res.end(JSON.stringify(objToJson));
//     } else {
//       const objToJson = {
//         result: 'Its not a Palindrome!'
//       }
//       res.end(JSON.stringify(objToJson));
//     }

//     //--------------------------------------------------------




//     // const flipNum = Math.floor(Math.random() * 2) // random num between 0 and 1.9999 rounded down to nearest int
//     // //1 is heads 0 is tails for this example
//     // console.log(flipNum);


//     // if (params['guess'] == 'Heads' && flipNum === 1) {
//     //   res.writeHead(200, { 'Content-Type': 'application/json' });
//     //   const objToJson = {
//     //     result: 'You won it was heads!'
//     //   }
//     //   res.end(JSON.stringify(objToJson));
//     // } else if (params['guess'] == 'Tails' && flipNum === 0) {
//     //   res.writeHead(200, { 'Content-Type': 'application/json' });
//     //   const objToJson = {
//     //     result: 'You won it was tails!'
//     //   }
//     //   res.end(JSON.stringify(objToJson));
//     // } else {
//     //   res.writeHead(200, { 'Content-Type': 'application/json' });
//     //   const objToJson = {
//     //     result: 'Sorry you lost!'
//     //   }
//     //   res.end(JSON.stringify(objToJson));
//     // }



//     //----------------------------------Leons Code------
//     // if ('student' in params) {
//     //   if (params['student'] == 'leon') {
//     //     res.writeHead(200, { 'Content-Type': 'application/json' });
//     //     const objToJson = {
//     //       name: "leon",
//     //       status: "Boss Man",
//     //       currentOccupation: "Baller"
//     //     }
//     //     res.end(JSON.stringify(objToJson));
//     //   }//student = leon
//     //   else if (params['student'] != 'leon') {
//     //     res.writeHead(200, { 'Content-Type': 'application/json' });
//     //     const objToJson = {
//     //       name: "unknown",
//     //       status: "unknown",
//     //       currentOccupation: "unknown"
//     //     }
//     //     res.end(JSON.stringify(objToJson));
//     //   }//student != leon
//     // }//student if
//   }//else if
//   else if (page == '/css/style.css') {
//     fs.readFile('css/style.css', function (err, data) {
//       res.write(data);
//       res.end();
//     });
//   } else if (page == '/js/main.js') {
//     fs.readFile('js/main.js', function (err, data) {
//       res.writeHead(200, { 'Content-Type': 'text/javascript' });
//       res.write(data);
//       res.end();
//     });
//   } else {
//     figlet('404!!', function (err, data) {
//       if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//       }
//       res.write(data);
//       res.end();
//     });
//   }
// });

// server.listen(8000);







const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://void:voidcoderc23@cluster0.0fwy2nn.mongodb.net/PalindromeDB?retryWrites=true&w=majority";

const dbName = "PalindromeDB";

app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('Palindromes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { Palindromes: result })
  })
})

app.post('/Palindromes', (req, res) => {
  db.collection('Palindromes').insertOne({ name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown: 0 }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.post('/guess', (req, res) => {


  const wordGuess = req.body.msg.toLowerCase() //the word passed in from the user

  let isPalindrome = wordToCheck => wordToCheck.toLowerCase() === wordToCheck.split('').reverse().join('').toLowerCase() //function to check if its a palindrome

  let guessedWordResult = isPalindrome(wordGuess) //calling it on the word guessed by the user ,will be true or false

  if (guessedWordResult) {
    guessedWordResult = "It is a Palindrome!" //if its true set it to this string

  } else {
    guessedWordResult = "Sorry, its not a Palindrome!" //false, set it to this one

  }


  db.collection('Palindromes').insertOne({ msg: req.body.msg, palindrome: guessedWordResult } //pass the word and the string back to the front end

    , (err, result) => {

      if (err) return console.log(err)

      console.log('saved to database')

      res.redirect('/') //auto reload the page so that it forces a get request
    })
})


app.delete('/delet-word', (req, res) => {
  console.log("this is message", req.body.msg);
  console.log("this is palindrome", req.body.palindrome);

  db.collection('Palindromes').findOneAndDelete({ msg: req.body.msg }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

    //   $set: {
    //     thumbUp: req.body.thumbUp + 1
    //   }

//   .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
//     $set: {
//       thumbUp: req.body.thumbUp + 1
//     }
//   }, {
//       sort: { _id: -1 },
//       upsert: true
//     }, (err, result) => {
//       if (err) return res.send(err)
//       res.send(result)
//     })
// })


