const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cards.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const checkIdMiddleware = require('../middleware/checkId.middleware');

router.get('/', secureMiddleware.isAuthenticated, cardsController.index);
router.get('/:id', secureMiddleware.isAuthenticated,checkIdMiddleware.isChecked, cardsController.show);
router.post('/', secureMiddleware.isAuthenticated, cardsController.create);
router.put('/:id', secureMiddleware.isAuthenticated, checkIdMiddleware.isChecked, cardsController.update);
router.delete('/:id', secureMiddleware.isAuthenticated, checkIdMiddleware.isChecked, cardsController.destroy);

module.exports = router;
