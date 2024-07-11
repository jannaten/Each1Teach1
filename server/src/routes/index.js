const router = require('express').Router();

const authRouter = require('./auth.route');
const newsRouter = require('./news.route');
const userRouter = require('./user.route');
const fileRouter = require('./file.route');
const matchRouter = require('./match.route');
const configRouter = require('./config.route');
const analyticRouter = require('./analytics.route');

router.use('/news', newsRouter);
router.use('/auth', authRouter);
router.use('/files', fileRouter);
router.use('/users', userRouter);
router.use('/config', configRouter);
router.use('/matches', matchRouter);
router.use('/analytics', analyticRouter);

module.exports = router;
