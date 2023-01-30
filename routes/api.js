//dependancies
const db = require('../db/db.json');
const fs = require('fs');

module.exports = function (app) {
    app.get('/api/notes', (req, res) => {
        res.json(db);
    });

    app.post("/api/notes", (req, res) => {
        db.push(req.body);

        db.forEach((obj, i) => {
            obj.id = i + 1;
        });

        fs.writeFile("./db/db.json", JSON.stringify(db), () => {
            res.json(db);
        });
    });

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;

        db.splice(id - 1, 1);

        db.forEach((obj, i) => {
            obj.id = i + 1;
        });

        fs.writeFile("./db/db.json", JSON.stringify(db), () => {
            res.json(db);
        });
    });


};
