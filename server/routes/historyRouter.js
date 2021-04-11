const Router = require('express');
const router = new Router();
const historyController = require('../controllers/historyController');
const checkRole = require('../middleware/checkRoleMiddleware');

// router.post('/', checkRole('RECORDER'), historyController.add);
router.get('/', checkRole('ADMIN'), historyController.getAll);

module.exports = router;