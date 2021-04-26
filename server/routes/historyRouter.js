const Router = require('express');
const router = new Router();
const historyController = require('../controllers/historyController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', checkRole('ADMIN'), historyController.getAll);
router.get('/getRequestLogs/:id', historyController.getRequestLogs);
router.get('/getRecordLogs/:id', historyController.getRecordLogs);

module.exports = router;