const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("../views"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  return res.render("index");
});

app.post("/upload", upload.single("doc"), (req, res, next) => {
  //   console.log(req.file);
  //   console.log(req.body);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
