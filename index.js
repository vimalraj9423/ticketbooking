const express = require("express");
const mongoClient = require("./mongo/index");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.json());
const movieList = [
  {
    name: "Nayagan ($10)",
    value: 10,
    selectedSeats: [3, 4],
  },
  {
    name: "Thalapathi($10)",
    value: 12,
    selectedSeats: [],
  },
  {
    name: "Bombay ($8)",
    value: 8,
    selectedSeats: [],
  },
  {
    name: "Chekka Chivantha Vaanam($9)",
    value: 9,
    selectedSeats: [],
  },
  {
    name: "Suicied Squad ($10)",
    value: 10,
    selectedSeats: [],
  },
  {
    name: "Sarpatta Parambarai($10)",
    value: 10,
    selectedSeats: [],
  },
  {
    name: "Schinchan Untold Story  ($10)",
    value: 10,
    selectedSeats: [],
  },
  {
    name: "Avengers Endgame ($10)",
    value: 10,
    selectedSeats: [],
  },
];
app.get("/reset", (req, res) => {
  mongoClient.connect((err) => {
    mongoClient
      .db("theatre")
      .collection("movieList")
      .drop()
      .then(() => {});
    mongoClient
      .db("theatre")
      .collection("movieList")
      .insertMany(movieList)
      .then((result) => {
        mongoClient.close();
      });

    res.send({ message: "success" });
  });
});
app.post("/updateSeats", (req, res) => {
  const { selectedSeats, selectedMovieIndex } = req.body;
  console.log(req.body);

  mongoClient.connect((err) => {
    mongoClient
      .db("theatre")
      .collection("movieList")
      .find({})
      .toArray()
      .then((data) => {
        console.log(data[parseInt(selectedMovieIndex)]);
        console.log(data.length, selectedMovieIndex);
        mongoClient
          .db("theatre")
          .collection("movieList")
          .updateOne(
            {
              _id: data[parseInt(selectedMovieIndex)]._id,
            },
            {
              $addToSet: {
                selectedSeats: { $each: selectedSeats },
              },
            }
          )
          .then((result) => {
            mongoClient.close();
            res.send({ message: "success" });
          });
      });
  });
});
app.get("/getMovieList", (req, res) => {
  mongoClient.connect((err) => {
    mongoClient
      .db("theatre")
      .collection("movieList")
      .find({})
      .toArray()
      .then((movieList) => {
        res.send(movieList);
      });
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
