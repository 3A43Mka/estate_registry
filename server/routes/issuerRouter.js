const Router = require('express');
const router = new Router();
const issuerController = require('../controllers/issuerController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('RECORDER'), issuerController.add);
router.get('/', checkRole('RECORDER'), issuerController.getAll);
router.get('/:id', issuerController.getOne);

module.exports = router;