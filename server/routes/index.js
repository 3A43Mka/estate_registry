const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const addressRouter = require('./addressRouter');
const issuerRouter = require('./issuerRouter');
const estateRouter = require('./estateRouter');
const requestRouter = require('./requestRouter');
const recordRouter = require('./recordRouter');
const historyRouter = require('./historyRouter');

router.use('/user', userRouter);
router.use('/address', addressRouter);
router.use('/issuer', issuerRouter);
router.use('/estate', estateRouter);
router.use('/request', requestRouter);
router.use('/record', recordRouter);
router.use('/history', historyRouter);

module.exports = router;