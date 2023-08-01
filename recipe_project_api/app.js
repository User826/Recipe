const express = require('express')
const session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
var jsonParser = bodyParser.json()

const app = express()
// app.use(cookieParser)
app.use(cors(corsOptions));
app.use(
  session({
    secret: 'momo-and-tortie-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.post('/', jsonParser, (req, res) => {
    
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      client.connect(err => {
        const collection = client.db("Recipe").collection("User");
        // perform actions on the collection object
       
        collection.insertOne((req.body))
        setTimeout(() => {client.close()}, 1500)

      });
    
      res.status(200).send({ message: (req.body.title) + ' ' + (req.body.post) })
})

app.post('/confirm', jsonParser, (req, res) => {

  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  var allowLogIn = false

  var collection
    client.connect(err => {

      if (req.body.type == 'Username'){
        collection = client.db("Recipe").collection("User");
        
      }
      else if (req.body.type == 'Admin Username'){
        collection = client.db("Recipe").collection("Admin");
      }
      // perform actions on the collection object
          
      const cursor = collection.find({username:req.body.name, password: req.body.password})

      cursurArray = cursor.toArray().then(function(result){

          if (result.length != 0){
        
            res.status(200).send({message: "You can log in!"})
            
      
          }
          else {
            res.status(200).send({message: "Invalid login"})
          }
      })
           
      setTimeout(() => {client.close()}, 1500)
    });
})

app.post('/test', jsonParser, (req, res) => {


  // Make sure that I.P address is correct on MongoDB

  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  var allowLogIn = false

  var collection
    client.connect(err => {
          
      if (req.body.type == 'Username'){
        collection = client.db("Recipe").collection("User");
        
      }
      else if (req.body.type == 'Admin Username'){
        collection = client.db("Recipe").collection("Admin");
      }
      // perform actions on the collection object     

      const cursor = collection.find()

      cursurArray = cursor.toArray().then(function(result){
          
          if (result.length != 0){
        
            res.status(200).send({sendData:result})            
      
          }
          else {
            res.status(200).send({message: "Invalid login"})
          }
      })
            
      setTimeout(() => {client.close()}, 1500)      
    });  
})

app.get('/searchrecipe', jsonParser, async (req,res) => {
  const { MongoClient } = require("mongodb");
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  var collection

  

  try{
    

  if (req.query.search){
    
    collection = client.db("Recipe").collection("RecipeUnit");

    const myString = req.query.search;
    const myArray = [];

    const words = myString.split(' ');
    for (const word of words) {
      myArray.push(word);
    }
     await collection.createIndex({
        title: 'text',
        subheader: 'text',
        summary: 'text',
        steps: 'text'
      })



    
  
      const cursor = collection.find({$text: {$search: myArray.join(' ')}})
  
      cursurArray = cursor.toArray().then(function(result){
          
          if (result.length != 0){        
            res.status(200).send({sendData:result})                  
          }
          else {
            res.status(200).send({message: "Currently no recipes matching your search requirements"})
          }
      })
            
      setTimeout(() => {client.close()}, 1500)

  }}catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred' });
  }

})

app.get('/recipe', jsonParser, (req, res) =>{
  
  const { MongoClient } = require("mongodb");
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  var collection

  
  
    client.connect(err => {
    
      collection = client.db("Recipe").collection("RecipeUnit");
  
      const cursor = collection.find()
  
      cursurArray = cursor.toArray().then(function(result){
          
          if (result.length != 0){        
            res.status(200).send({sendData:result})                  
          }
          else {
            res.status(200).send({message: "Currently no recipes"})
          }
      })
            
      setTimeout(() => {client.close()}, 1500)
  })

  



  
})

app.post('/recipe', jsonParser, (req, res) => {

  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.connect(err => {
      const collection = client.db("Recipe").collection("RecipeUnit");
      // perform actions on the collection object
     
      collection.insertOne((req.body))
      setTimeout(() => {client.close()}, 1500)

    });
    res.status(200).send({ message: (req.body)})
})

app.post('/user', jsonParser, (req, res) => {

  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.connect(err => {
      const collection = client.db("Recipe").collection("User");
      // perform actions on the collection object
     
      collection.insertOne((req.body))
      setTimeout(() => {client.close()}, 1500)

    });
    res.status(200).send({ message: (req.body)})
})

app.put('/user', jsonParser, (req, res) => {
  const { MongoClient } = require("mongodb");
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  var collection

  console.log('Im in delete')
  console.log(req.body)

  if (req.body.action = 'reject'){
    
    // const filter = {username: req.body.username}
    // const updating = {$set: {approved: false}}
    
    collection = client.db("Recipe").collection("User");
      
      

      // const cursor = collection.findOneAndUpdate(filter, updating).then((result) =>{
      const cursor = collection.findOneAndDelete({username: req.body.username}).then((result) =>{
        if (result){

          res.status(200).send({message:"rejected"})
        } else {

          res.status(200).send({message: "Currently no users"})
        }})}
  else{
    const filter = {username: req.body.username}
    const updating = {$set: {approved: true}}
    
    collection = client.db("Recipe").collection("User");
      
      

      const cursor = collection.findOneAndUpdate(filter, updating).then((result) =>{
        if (result){

          res.status(200).send({message:"approved"})
        } else {

          res.status(200).send({message: "Currently no users"})
        }})}
  
        
      // res.send(req.body)

})

app.get('/user', jsonParser, (req, res) =>{
  
  const { MongoClient } = require("mongodb");
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  var collection

  

  if (req.query.awaiting){
    
    collection = client.db("Recipe").collection("User");
      
      const query = {approved: false}

      const cursor = collection.find(query).toArray().then((result) =>{
        if (result){

          res.status(200).send({awaiting:result})
        } else {

          res.status(200).send({message: "Currently no users"})
        }})} else{
    const {username, password} = req.query
    client.connect(err => {
      
      collection = client.db("Recipe").collection("User");
      
      const query = {username: username, password: password, approved: true}

      const cursor = collection.findOne(query).then((result) =>{
        if (result){

          res.status(200).send({sendData:result})
        } else {

          res.status(200).send({message: "Currently no users"})
        }

      })

      setTimeout(() => {client.close()}, 1500)
    })}
  
})

app.get('/admin', jsonParser, (req, res) =>{


  if (req.session.admin){
    res.status(200).send({admin:true})
  } else{
    res.status(200).send({error: 'Not an admin'})
  }
  
  // if (req.session.admin==true){
  //   res.status(200).send({admin:"true"})
  // }
})

app.post('/admin', jsonParser, (req, res) => {
  
    if (req.body.admin){
      req.session.admin=true
      req.session.save(() => {
        
        return res.status(200).send({ message: "Admin confirmed"})
        
      })
    } else{
      return res.status(400)
    }
})

app.get('/set-session', (req, res) => {
  req.session.test = 'test value';
  res.send('Session set');
});

app.get('/get-session', (req, res) => {
  res.send(req.session.test);
});


app.listen(5000, () => {
    console.log("Listening to port 5000")
})