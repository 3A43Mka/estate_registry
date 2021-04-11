const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const addressRouter = require('./addressRouter');
const issuerRouter = require('./issuerRouter');
const estateRouter = require('./estateRouter');

router.use('/user', userRouter);
router.use('/address', addressRouter);
router.use('/issuer', issuerRouter);
router.use('/estate', estateRouter);

module.exports = router;