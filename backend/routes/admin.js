const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");
const admin = require("../middleware/admin");

// ROUTES //

// POST //
router.get("/users", admin, adminCtrl.getAllUsersAdmin);

// EXPORT //

module.exports = router;
