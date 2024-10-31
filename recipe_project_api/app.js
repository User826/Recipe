const express = require('express')
const session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200
}
var jsonParser = bodyParser.json()

const app = express()
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

        collection.insertOne(req.body)
        setTimeout(() => { client.close() }, 1500)
    });

    res.status(200).send({ message: `Received your post titled "${req.body.title}". Thank you!` })
})

app.post('/confirm', jsonParser, (req, res) => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    let collection;

    client.connect(err => {
        if (err) {
            return res.status(500).send({ message: "Failed to connect to the database. Please try again later." });
        }

        // Determine which collection to use based on user type
        if (req.body.type === 'Username') {
            collection = client.db("Recipe").collection("User");
        } else if (req.body.type === 'Admin Username') {
            collection = client.db("Recipe").collection("Admin");
        }

        // Perform a find operation to check credentials
        collection.findOne({ username: req.body.name, password: req.body.password }, (findErr, user) => {
            client.close(); // Always close the client connection

            if (findErr) {
                return res.status(500).send({ message: "An error occurred while searching for the user. Please try again." });
            }

            if (user) {
                const isAdmin = user.admin; // Assuming 'admin' is a field in the user document
                res.status(200).send({
                    message: "Login successful! Welcome back!",
                    sendData: {
                        username: user.username,
                        admin: isAdmin,
                    }
                });
            } else {
                res.status(200).send({ message: "Login failed! Your credentials do not match any records." });
            }
        });
    });
});

app.post('/test', jsonParser, (req, res) => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    var collection;

    client.connect(err => {
        if (req.body.type === 'Username') {
            collection = client.db("Recipe").collection("User");
        } else if (req.body.type === 'Admin Username') {
            collection = client.db("Recipe").collection("Admin");
        }

        const cursor = collection.find();

        cursor.toArray().then(function (result) {
            if (result.length !== 0) {
                res.status(200).send({ sendData: result });
            } else {
                res.status(200).send({ message: "No users found in the database. Please check back later." });
            }
        });

        setTimeout(() => { client.close() }, 1500);
    });
})

app.get('/searchrecipe', jsonParser, async (req, res) => {
    const { MongoClient } = require("mongodb");
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    var collection;

    try {
        if (req.query.search) {
            collection = client.db("Recipe").collection("RecipeUnit");
            const myString = req.query.search;
            const myArray = myString.split(' ');

            await collection.createIndex({
                title: 'text',
                subheader: 'text',
                summary: 'text',
                steps: 'text'
            });

            const cursor = collection.find({ $text: { $search: myArray.join(' ') } });

            cursor.toArray().then(function (result) {
                if (result.length !== 0) {
                    res.status(200).send({ sendData: result });
                } else {
                    res.status(200).send({ message: "No recipes match your search criteria. Please try different keywords." });
                }
            });

            setTimeout(() => { client.close() }, 1500);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An unexpected error occurred. Please try again later.' });
    }
})

app.get('/recipe', jsonParser, (req, res) => {
    const { MongoClient } = require("mongodb");
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    var collection;

    client.connect(err => {
        collection = client.db("Recipe").collection("RecipeUnit");

        const cursor = collection.find();

        cursor.toArray().then(function (result) {
            if (result.length !== 0) {
                res.status(200).send({ sendData: result });
            } else {
                res.status(200).send({ message: "Currently, there are no recipes available in the database." });
            }
        });

        setTimeout(() => { client.close() }, 1500);
    });
})

app.post('/recipe', jsonParser, (req, res) => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.connect(err => {
        const collection = client.db("Recipe").collection("RecipeUnit");
        collection.insertOne(req.body)
        setTimeout(() => { client.close() }, 1500)
    });
    res.status(200).send({ message: `Recipe titled "${req.body.title}" has been successfully added!` });
})

app.post('/user', jsonParser, (req, res) => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.connect(err => {
        const collection = client.db("Recipe").collection("User");
        collection.insertOne(req.body)
        setTimeout(() => { client.close() }, 1500)
    });
    res.status(200).send({ message: `User "${req.body.username}" has been successfully registered!` });
})

app.put('/user', jsonParser, (req, res) => {
    const { MongoClient } = require("mongodb");
    const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    var collection;

    if (req.body.action === 'reject') {
        collection = client.db("Recipe").collection("User");
        collection.findOneAndDelete({ username: req.body.username }).then((result) => {
            if (result) {
                res.status(200).send({ message: `"${req.body.username}" has been successfully rejected.` });
            } else {
                res.status(200).send({ message: `No users found with the username "${req.body.username}".` });
            }
        });
    } else {
        const filter = { username: req.body.username };
        const updating = { $set: { approved: true } };
        collection = client.db("Recipe").collection("User");
        collection.findOneAndUpdate(filter, updating).then((result) => {
            if (result) {
                res.status(200).send({ message: `"${req.body.username}" has been successfully approved.` });
            } else {
                res.status(200).send({ message: `No pending approvals found for "${req.body.username}".` });
            }
        });
    }

    setTimeout(() => { client.close() }, 1500);
});

// app.get('/user', jsonParser, async (req, res) => {
//     const { MongoClient } = require("mongodb");
//     const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);
//     const collection = client.db("Recipe").collection("User");

//     if (req.query.awaiting) {
//         const query = { approved: false };

//         collection.find(query).toArray().then(function (result) {
//             if (result.length !== 0) {
//                 res.status(200).send({ awaiting: result });
//             } else {
//                 res.status(200).send({ message: "No users are currently awaiting approval." });
//             }
//         });
//     } else {
//         const { username, password } = req.query;

//         const query = { username: username, password: password, approved: true };
//         collection.findOne(query).then(function (result) {
//             if (result) {
//                 res.status(200).send({ sendData: result });
//             } else {
//                 res.status(200).send({ message: "No matching user found or approval status is pending." });
//             }
//         });
//     }

//     setTimeout(() => { client.close() }, 1500);
// });
app.get('/user', jsonParser, async (req, res) => {
  const { MongoClient } = require("mongodb");
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  
  try {
      await client.connect();
      const collection = client.db("Recipe").collection("User");

      // Check if we are fetching awaiting users
      if (req.query.awaiting) {
          const query = { approved: false };

          const result = await collection.find(query).toArray();
          if (result.length !== 0) {
              res.status(200).send({ awaiting: result });
          } else {
              res.status(200).send({ message: "No users are currently awaiting approval." });
          }
      } else {
          const { username, password } = req.query;

          const query = { username: username, password: password, approved: true };
          const result = await collection.findOne(query);
          if (result) {
              res.status(200).send({ sendData: result });
          } else {
              res.status(200).send({ message: "No matching user found or approval status is pending." });
          }
      }
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send({ error: 'Error fetching users' });
  } finally {
      await client.close(); // Ensure the client is closed after the operation
  }
});



app.patch('/user/:id/approve', async (req, res) => {
  const { MongoClient } = require("mongodb");
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
      await client.connect();
      const collection = client.db("Recipe").collection("User");
      
      const userId = req.params.id;
      const update = { $set: { approved: true } };

      const result = await collection.findOneAndUpdate(
          { _id: new require('mongodb').ObjectId(userId) }, // Convert string ID to ObjectId
          update,
          { returnOriginal: false } // Return the updated document
      );

      if (!result.value) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.json(result.value); // Return the updated user
  } catch (error) {
      console.error('Error approving user:', error);
      res.status(500).json({ error: `Error approving user: ${error.message}` });
  } finally {
      await client.close(); // Ensure the client is closed after the operation
  }
});


app.get('/admin', jsonParser, async (req, res) => {
  const { MongoClient } = require("mongodb");
  const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const collection = client.db("Recipe").collection("Admin");

  const { username, password } = req.query;

  try {
      const admin = await collection.findOne({ username, password });
      if (admin) {
          res.status(200).send({ admin: true });
      } else {
          res.status(200).send({ admin: false });
      }
  } catch (error) {
      console.error('Error checking admin:', error);
      res.status(500).send({ error: 'Error checking admin' });
  } finally {
      setTimeout(() => { client.close() }, 1500);
  }
});



app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});
