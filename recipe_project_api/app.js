const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
var jsonParser = bodyParser.json()

const app = express()
app.use(cors(corsOptions));
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


  console.log(req.get('Content-type'))
  console.log(typeof(req.body))
  

  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  var allowLogIn = false

  var collection
    client.connect(err => {
      console.log(req.body.type)
      console.log(req.body.name)
      if (req.body.type == 'Username'){
        collection = client.db("Recipe").collection("User");
        
      }
      else if (req.body.type == 'Admin Username'){
        collection = client.db("Recipe").collection("Admin");
      }
      // perform actions on the collection object
          
      const cursor = collection.find({username:req.body.name, password: req.body.password})

      cursurArray = cursor.toArray().then(function(result){
          console.log(result)
          console.log(result.length==0)

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
})})

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
    res.status(200).send({ message: (req.body.title) + ' ' + (req.body.post) })
  console.log(req.body)
})

app.listen(5000, () => {
    console.log("Listening to port 5000")
})