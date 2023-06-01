// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET'){
    console.log(req.body)
    res.status(200).json({ message: JSON.parse(req.body) })

  }
  else{

    const { MongoClient, ServerApiVersion } = require('mongodb');
      const uri = "mongodb+srv://Dannywu826:<password>@cluster0.sstc4pm.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      client.connect(err => {
        const collection = client.db("Recipe").collection("User");
        // perform actions on the collection object
        collection.insertOne(JSON.parse(req.body))
        client.close();
      });



    res.status(200).send({ message: JSON.parse(req.body)['title'] + ' ' + JSON.parse(req.body)['post'] })

  }
  
}