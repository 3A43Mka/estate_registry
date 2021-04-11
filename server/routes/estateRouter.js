const Router = require('express');
const router = new Router();
const estateController = require('../controllers/estateController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('RECORDER'), estateController.add);
router.get('/', checkRole('RECORDER'), estateController.getAll);
router.get('/:id', estateController.getOne);

module.exports = router;