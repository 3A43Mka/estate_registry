const Router = require('express');
const router = new Router();
const recordController = require('../controllers/recordController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('RECORDER'), recordController.add);
router.get('/', checkRole('RECORDER'), recordController.getAll);
router.get('/:id', recordController.getOne);
router.patch('/toggleRecord/:id', checkRole('RECORDER'), recordController.toggleRecord);

module.exports = router;