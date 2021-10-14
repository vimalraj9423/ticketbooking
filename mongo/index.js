const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://vimalraj:Mymongodb349@cluster0.66a4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
module.exports = client;
