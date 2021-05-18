// Permet d'importer express
const express = require("express");

// Crée un routeur
const router = express.Router();

// Permet d'importer le middleware auth
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Permet d'importer le controller message
const postCtrl = require("../controllers/post");

// Routes de l'API pour les messages
router.post("", auth, multer, postCtrl.createPost);
router.get("", auth, postCtrl.getAllPosts);
router.put("/:postId", auth, multer, postCtrl.modifyPost);
router.delete("/:postId", auth, postCtrl.deletePost);

// Permet d'exporter le router
module.exports = router;
