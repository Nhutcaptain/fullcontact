const express = require('express');

const contacts = require('../controllers/contact.controller');

const router = express.Router();

const app = express();

router.route("/")
    .get(contacts.findAll) //Dùng các mudole đã được định nghĩa ở file controllers
    .post(contacts.create)
    .delete(contacts.deleteAll);

router.route("/favorite")
    .get(contacts.findAllFavorite);

router.route("/:id")
    .get(contacts.findOne)
    .put(contacts.update)
    .delete(contacts.delete);

module.exports = router;
