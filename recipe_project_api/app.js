const express = require('express');
const session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200
}

var jsonParser = bodyParser.json();

const app = express();
app.use(cors(corsOptions));
app.use(
    session({
        secret: 'momo-and-tortie-secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

// MongoDB connection setup
const uri = "mongodb+srv://Dannywu826:Momo826826@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let db;

// Initialize the MongoDB connection
async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db("Recipe"); // Store the database instance
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the application if connection fails
    }
}

// Endpoint implementations
app.post('/', jsonParser, async (req, res) => {
    try {
        const collection = db.collection("User");
        await collection.insertOne(req.body);
        res.status(200).send({ message: `Received your post titled "${req.body.title}". Thank you!` });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send({ message: "Failed to insert user." });
    }
});

app.post('/confirm', jsonParser, async (req, res) => {
    try {
        let collection;
        if (req.body.type === 'Username') {
            collection = db.collection("User");
        } else if (req.body.type === 'Admin Username') {
            collection = db.collection("Admin");
        }

        const user = await collection.findOne({ username: req.body.name, password: req.body.password });

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
    } catch (error) {
        console.error('Error confirming user:', error);
        res.status(500).send({ message: "An error occurred while confirming user." });
    }
});

app.post('/test', jsonParser, async (req, res) => {
    try {
        let collection;
        if (req.body.type === 'Username') {
            collection = db.collection("User");
        } else if (req.body.type === 'Admin Username') {
            collection = db.collection("Admin");
        }

        const result = await collection.find().toArray();
        if (result.length !== 0) {
            res.status(200).send({ sendData: result });
        } else {
            res.status(200).send({ message: "No users found in the database. Please check back later." });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Error fetching users' });
    }
});

app.get('/searchrecipe', jsonParser, async (req, res) => {
    if (!req.query.search) {
        return res.status(400).send({ message: "Search query is required." });
    }

    try {
        const collection = db.collection("RecipeUnit");
        const myString = req.query.search;
        const myArray = myString.split(' ');

        await collection.createIndex({
            title: 'text',
            subheader: 'text',
            summary: 'text',
            steps: 'text'
        });

        const result = await collection.find({ $text: { $search: myString } }).toArray();

        if (result.length !== 0) {
            res.status(200).send({ sendData: result });
        } else {
            res.status(200).send({ message: "No recipes match your search criteria. Please try different keywords." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An unexpected error occurred. Please try again later.' });
    }
});

app.get('/recipe', jsonParser, async (req, res) => {
    try {
        const collection = db.collection("RecipeUnit");
        const result = await collection.find().toArray();

        if (result.length !== 0) {
            res.status(200).send({ sendData: result });
        } else {
            res.status(200).send({ message: "Currently, there are no recipes available in the database." });
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send({ message: 'Error fetching recipes' });
    }
});

app.post('/recipe', jsonParser, async (req, res) => {
    try {
        const collection = db.collection("RecipeUnit");
        await collection.insertOne(req.body);
        res.status(200).send({ message: `Recipe titled "${req.body.title}" has been successfully added!` });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).send({ message: 'Error adding recipe' });
    }
});

app.post('/user', jsonParser, async (req, res) => {
    try {
        const collection = db.collection("User");
        await collection.insertOne(req.body);
        res.status(200).send({ message: `User "${req.body.username}" has been successfully registered!` });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user' });
    }
});

app.put('/user', jsonParser, async (req, res) => {
    try {
        let collection;
        if (req.body.action === 'reject') {
            collection = db.collection("User");
            const result = await collection.findOneAndDelete({ username: req.body.username });
            if (result) {
                res.status(200).send({ message: `"${req.body.username}" has been successfully rejected.` });
            } else {
                res.status(200).send({ message: `No users found with the username "${req.body.username}".` });
            }
        } else {
            const filter = { username: req.body.username };
            const updating = { $set: { approved: true } };
            collection = db.collection("User");
            const result = await collection.findOneAndUpdate(filter, updating);
            if (result) {
                res.status(200).send({ message: `"${req.body.username}" has been successfully approved.` });
            } else {
                res.status(200).send({ message: `No pending approvals found for "${req.body.username}".` });
            }
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: 'Error updating user' });
    }
});

// Get user info, including approval status
app.get('/user', jsonParser, async (req, res) => {
    try {
        const collection = db.collection("User");

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
    }
});

app.patch('/user/:id/approve', async (req, res) => {
    try {
        const userId = req.params.id;
        const update = { $set: { approved: true } };
        const result = await db.collection("User").findOneAndUpdate(
            { _id: new require('mongodb').ObjectId(userId) }, // Convert string ID to ObjectId
            update,
            { returnOriginal: false }
        );

        if (result.value) {
            res.status(200).send({ message: `User with ID ${userId} has been approved.` });
        } else {
            res.status(404).send({ message: `User with ID ${userId} not found.` });
        }
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).send({ message: 'Error approving user' });
    }
});

// Close the MongoDB connection on server shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});

// Connect to MongoDB and start the server
connectToDatabase().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
    });
});
