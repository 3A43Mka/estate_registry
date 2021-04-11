const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getAll', checkRole('ADMIN'),  userController.getAll);
router.patch('/toggleUser/:id', checkRole('ADMIN'), userController.toggleUser);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;