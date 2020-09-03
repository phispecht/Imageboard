const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}
let count = 0;

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_ID,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }

    count += 1;
    console.log(count);
    if (count <= 40) {
        const { filename, mimetype, size, path } = req.file;

        const promise = s3
            .putObject({
                Bucket: "imageboard-specht",
                ACL: "public-read",
                Key: filename,
                Body: fs.createReadStream(path),
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise();

        promise
            .then(() => {
                // it worked!!!
                next();
                fs.unlink(path, () => {});
            })
            .catch((err) => {
                // uh oh
                res.sendStatus(500);
                console.log(err);
            });
    }
};
