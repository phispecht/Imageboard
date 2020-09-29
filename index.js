const express = require("express");
const app = express();
const db = require("./db");
const { s3Url } = require("./config.json");
const s3 = require("./s3.js");

app.use(express.static("public"));
app.use(express.json());

////// File upload Boilderplate ///////

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { V4MAPPED } = require("dns");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const imageUrl = `${s3Url}${filename}`;

    const title = req.body.title;
    const descr = req.body.description;
    const username = req.body.username;

    if (req.file) {
        db.insertImage(imageUrl, username, title, descr)
            .then(function (rows) {
                res.json(rows.rows);
            })
            .catch(function () {
                res.json({
                    success: false,
                });
            });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("/images", (req, res) => {
    db.getImages()
        .then(function (imageData) {
            const images = imageData.rows;
            res.json(images);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get("/oneImage/:id", (req, res) => {
    db.getOneImage(req.params.id)
        .then(function (oneImage) {
            res.json(oneImage.rows[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get("/impresusm", (req, res) => {
    db.getOneImage(req.params.id)
        .then(function (oneImage) {
            res.json(oneImage.rows[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get("/datenschutz", (req, res) => {
    db.getOneImage(req.params.id)
        .then(function (oneImage) {
            res.json(oneImage.rows[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get("/disclaimer", (req, res) => {
    db.getOneImage(req.params.id)
        .then(function (oneImage) {
            res.json(oneImage.rows[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/comments", (req, res) => {
    var username = req.body.objectSendData.commentUsername;
    var input = req.body.objectSendData.commentInput;
    var id = req.body.objectSendData.id;

    db.insertComments(username, input, id)
        .then(function (comments) {
            res.json(comments);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get("/comments/:id", (req, res) => {
    db.getComments(req.params.id)
        .then(function (comments) {
            res.json(comments.rows);
        })
        .catch(function (error) {
            console.log(error);
        });
});

///////// more Images ////////////

app.get("/moreImages/:firstId/:amountImages", (req, res) => {
    var firstId = req.params.firstId;
    var amountImages = req.params.amountImages;

    db.getMoreImages(firstId, amountImages)
        .then(function (moreImages) {
            res.json(moreImages);
        })
        .catch(function (error) {
            console.log(error);
            res.send(500);
        });
});

app.listen(process.env.PORT || 8080, () => console.log("server listening!"));
