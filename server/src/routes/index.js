const router = require('express').Router();

const authRouter = require('./auth.route');
const analyticRouter = require('./analytics.route');
const newsRouter = require('./news.route');
const userRouter = require('./user.route');
const configRouter = require('./config.route');
const chatRouter = require('./chat.route')

router.use('/news', newsRouter);
router.use('/auth', authRouter);
router.use('/analytics', analyticRouter);
router.use('/users', userRouter);
router.use('/config', configRouter);
router.use('/chat', chatRouter)

module.exports = router;
