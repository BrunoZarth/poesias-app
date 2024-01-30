const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const fileName = originalname.split(".");
    cb(null, `${fileName[0]}.${fileName[1]}`);
  }
});

const upload = multer({ storage }).single("single");

const poesia = require("../routes/poesia");
app.use("/poesia", poesia)

const autor = require("../routes/autor");
app.use("/autor", autor)

const main = require("../routes/main");
app.use("/main", main)

app.post("/upload", (req, res) => {


  upload(req, res, (err) => {
    console.log(req.file);
    if (err) {
      console.log("erro ao enviar imagem");
    } else {
      console.log("imagem enviada");
    }
  });
});

app.use('/img', express.static(path.join(__dirname, 'upload')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));

