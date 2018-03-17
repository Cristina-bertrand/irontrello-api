const express = require('express');
const router = express.Router();
const secureMiddleware = require('../middleware/secure.middleware');
const sessionController = require('../controllers/session.controller');

router.post('/signup', sessionController.signup);
router.post('/create', sessionController.create);
router.delete('/', secureMiddleware.isAuthenticated, sessionController.destroy);


module.exports = router;
