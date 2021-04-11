const Router = require('express');
const router = new Router();
const addressController = require('../controllers/addressController');

router.get('/getFullAddress/:id', addressController.getFullAddress);

module.exports = router;