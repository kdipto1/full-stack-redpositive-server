const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// MongDB connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qjyt1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// console.log(uri);
async function run() {
  try {
    await client.connect();
    const dataCollection = client.db("candidate").collection("candidates");
    // console.log(client);
    //Add candidates
    app.post("/addCandidate", async (req, res) => {
      const newCandidate = req.body;
      const result = await dataCollection.insertOne(newCandidate);
      res.send(result);
    });
    //api for getting all candidates
    app.get("/candidates", async (req, res) => {
      const query = {};
      const candidates = await dataCollection.find(query).toArray();
      res.send(candidates);
    });
    //update candidate api
    app.put("/updateCandidates/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: data };
      const option = { upsert: true };
      const result = await dataCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    });
    //api for deleting candidate
    app.delete("/deleteCandidate/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await dataCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

//Test purpose api
app.get("/", (req, res) => {
  res.send("Hello World - Crud!");
});
app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
