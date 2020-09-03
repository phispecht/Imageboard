const spicedPg = require("spiced-pg");

/* const { user, pw } = require("./secrets.json"); */

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { user, pw } = require("./secrets.json");
    db = spicedPg(`postgres:${user}:${pw}@localhost:5432/imageboard`);
}

exports.getImages = () => {
    return db.query(`SELECT * FROM images ORDER BY id DESC LIMIT 20`);
};

exports.getMoreImages = (startId, offset) =>
    db
        .query(
            `SELECT * FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 10
        OFFSET $2`,
            [startId, offset]
        )
        .then(({ rows }) => rows);

exports.insertImage = (url, username, title, descr) => {
    return db.query(
        `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *`,
        [url, username, title, descr]
    );
};

exports.getOneImage = (id) => {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
};

exports.insertComments = (commentUser, commentInput, id) => {
    return db.query(
        `INSERT INTO comments (username, comment, image_id) VALUES ($1, $2, $3) RETURNING *`,
        [commentUser, commentInput, id]
    );
};

exports.petitionInsertSignatures = (signature, id) => {
    return db.query(
        `INSERT INTO signatures (signature, user_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET signature=$1`,
        [signature, id]
    );
};

exports.getComments = (id) => {
    return db.query(`SELECT * FROM comments WHERE image_id = $1`, [id]);
};
