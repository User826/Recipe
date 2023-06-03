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


    // console.log(req.get('Content-type'))
    // console.log(typeof(req.body))
    

    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      client.connect(err => {
        const collection = client.db("Recipe").collection("User");
        // perform actions on the collection object
       
        collection.insertOne((req.body))
        setTimeout(() => {client.close()}, 1500)

      });

    // if (err) throw err;
    // var dbo = db.db("Recipe");
    // var myobj = { name: "Company Inc", address: "Highway 37" };
    // dbo.collection("User").insertOne(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });



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
     
      // console.log(collection.find({title:req.body.title, post: req.body.post}))

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
      // console.log(cursurArray)

      // console.log(cursurArray.length)

      

      
      // if(cursor.next() != null){
      //   allowLogIn = true
      // }
      
      setTimeout(() => {client.close()}, 1500)

    });

  // if (err) throw err;
  // var dbo = db.db("Recipe");
  // var myobj = { name: "Company Inc", address: "Highway 37" };
  // dbo.collection("User").insertOne(myobj, function(err, res) {
  //     if (err) throw err;
  //     console.log("1 document inserted");
  //     db.close();
  // });


    // if (allowLogIn == true){
    //   res.status(200).send({message: "You can log in!"})

    // }
    // res.status(200).send({ message: (req.body.title) + ' ' + (req.body.post) })
})

app.post('/test', jsonParser, (req, res) => {


  // console.log(req.get('Content-type'))
  // console.log(typeof(req.body))
  

  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  var allowLogIn = false

  var collection
    client.connect(err => {
      // console.log(req.body.type)
      // console.log(req.body.name)
    
      if (req.body.type == 'Username'){
        collection = client.db("Recipe").collection("User");
        
      }
      else if (req.body.type == 'Admin Username'){
        collection = client.db("Recipe").collection("Admin");
      }
      // perform actions on the collection object
     
      // console.log(collection.find({title:req.body.title, post: req.body.post}))

      const cursor = collection.find()

      cursurArray = cursor.toArray().then(function(result){
          // console.log(result)
          // console.log(result.length==0)

          if (result.length != 0){
        
            res.status(200).send({sendData:result})
            
      
          }
          else {
            res.status(200).send({message: "Invalid login"})
          }
      })
      // console.log(cursurArray)

      // console.log(cursurArray.length)

      

      
      // if(cursor.next() != null){
      //   allowLogIn = true
      // }
      
      // setTimeout(() => {client.close()}, 1500)
      client.close()

    });

  // if (err) throw err;
  // var dbo = db.db("Recipe");
  // var myobj = { name: "Company Inc", address: "Highway 37" };
  // dbo.collection("User").insertOne(myobj, function(err, res) {
  //     if (err) throw err;
  //     console.log("1 document inserted");
  //     db.close();
  // });


    // if (allowLogIn == true){
    //   res.status(200).send({message: "You can log in!"})

    // }
    // res.status(200).send({ message: (req.body.title) + ' ' + (req.body.post) })
})

app.post('/sample', jsonParser, (req, res) =>{
  
  const { MongoClient } = require("mongodb");
  // Replace the uri string with your connection string.
  const uri = "<connection string uri>";
  const client = new MongoClient(uri);
  async function run() {
    try {
      const database = client.db('sample_mflix');
      const movies = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
      const query = { title: 'Back to the Future' };
      const movie = await movies.findOne(query);
      console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);


})


app.listen(5000, () => {
    console.log("Listening to port 5000")
})