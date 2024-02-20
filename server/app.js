const express = require("express");
const cors = require("cors");
const uploadImage = require('./uploadImage');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "250mb" }));
// app.use(express.urlencoded({ limit: "250mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/uploadImage", async (req, res) => {
  try {
    const url = await uploadImage.uploadImage(req.body.image);
    res.send(url);
  } catch (error) {
    console.log(error.message + "\n" + error);
    res.status(500).send({ error: error.message });
  }
});


app.post("/uploadMultipleImages", (req, res) => {

  uploadImage
    .uploadMultipleImages(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
