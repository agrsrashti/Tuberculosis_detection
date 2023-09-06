const path = require("path");
const fs = require("fs");
const util = require("util");
const { parse } = require("path");
const { TBRef } = require("../models/TBModel");
const exec = util.promisify(require("child_process").exec);
const mongoose = require("mongoose");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    res.status(400).send("No file selected");
    return;
  }
  console.log(req.file);

  const imagePath = path.join(
    __dirname,
    "..",
    "uploads",
    `${req.file.filename}`
  );
  const modelPath = path.join(__dirname, "..");
  // Read the file content for prediction.
  let img = fs.readFileSync(req.file.path);
  img = Buffer.from(img).toString("base64");

  const predict = `python fastai_model.py -m "${modelPath}" -i "${imagePath}"`;
  var tuberculosis, normal;
  try {
    const { stdout, stderr } = await exec(predict);
    console.log(stdout, typeof stdout);
    const diseases = stdout.split(",");
    tuberculosis = parseFloat(diseases[0].slice(1, diseases[0].length - 1));
    //console.log(tuberculosis);
    normal = parseFloat(diseases[1].slice(1, diseases[1].length - 1));
    //console.log(normal, typeof normal);
  } catch (e) {
    console.error(e);
  }
  const prediction = {
    tuberculosis: tuberculosis,
    normal: normal,
  };
  // console.log(prediction, typeof prediction);
  let predictionName = "";
  let predictionScore = 0;
  if (tuberculosis > normal) {
    predictionName = "tuberculosis";
    predictionScore = tuberculosis;
  } else {
    predictionName = "normal";
    predictionScore = normal;
  }
  // console.log(predictionName, predictionScore);
  // if (predictionScore < 0.5) {
  //   predictionScore = 1 - predictionScore;
  //   predictionName = "None";
  // }
  await TBRef.create({
    image: img,
    type: req.file.mimetype,
    aiDiagnosis: {
      confidence: predictionScore,
      condition: capitalizeFirstLetter(predictionName),
    },
  })
    .then((TBRef) => setTimeout(() => res.status(200).send({ TBRef }), 5000))
    .catch((err) => res.status(400).send(err));
};
//vision-343514
exports.getImage = async (req, res) => {
  const TBRef = await TBRef.findById(req.params.TBId);
  res.writeHead(200, {
    "Content-Type": TBRef.type,
    "Content-disposition": "attachment;filename=" + req.params.TBId,
    "Content-Length": TBRef.image.length,
  });
  res.end(Buffer.from(TBRef.image, "binary"));
};
exports.getAll = async (req, res) => {
  TBRef.find()
    .sort("-date")
    .then((TBRef) => res.status(200).send(TBRef))
    .catch((err) => res.status(500).send(err));
};
exports.diagnose = async (req, res) => {
  TBRef.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.TBId), {
    doctorDiagnosis: req.body.diagnosis,
  })
    .then((TBRef) => res.status(200).send(TBRef))
    .catch((err) => res.status(500).send(err));
};
exports.requestDoc = async (req, res) => {
  TBRef.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.TBId), {
    doctorRequested: true,
  })
    .then((TBRef) => res.status(200).send(TBRef))
    .catch((err) => res.status(500).send(err));
};
