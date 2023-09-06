const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  uploadImage,
  getImage,
  getAll,
  diagnose,
  requestDoc,
} = require("../controllers/uploadApis");

const upload = multer({ dest: "uploads/" });
//Login and Signup apis
router.post("/login");
router.post("/signup");

//upload and process apis
router.post("/upload", upload.single("img"), uploadImage);
router.get("/image/:dermaId", getImage);
router.get("/all", getAll);
router.post("/diagnose", diagnose);
router.post("/request-doctor", requestDoc);

module.exports = router;
