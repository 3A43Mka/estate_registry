const Router = require('express');
const router = new Router();
const requestController = require('../controllers/requestController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('RECORDER'), requestController.add);
router.get('/', requestController.getAll);
router.get('/:id', requestController.getOne);

module.exports = router;