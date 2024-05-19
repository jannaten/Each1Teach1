const router = require('express').Router();
const NewsService = require('../services/NewsService');
const { sharedContext } = require('../utilities/dbContext');
const { authHandler } = require('../middlewares/authHandler');
const { createError } = require('../middlewares/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');
const validateObjectId = require('../middlewares/validateObjectId');
const { newsValidationSchema, newsPatchSchema } = require('../validation');

const getNewsService = async () => {
	const context = await sharedContext();
	return new NewsService(context);
};

router.get(
	'/',
	asyncErrorHandler(async (req, res) => {
		const newsService = await getNewsService();
		const news = await newsService.getAll();
		res.json(news);
	})
);

router.get(
	'/latestNews',
	asyncErrorHandler(async (req, res) => {
		const newsService = await getNewsService();
		const topNews = await newsService.getTopNews(2);
		res.json(topNews);
	})
);
router.get(
	'/:id',
	validateObjectId,
	asyncErrorHandler(async (req, res) => {
		const newsService = await getNewsService();
		const news = await newsService.getById(req.params.id);
		if (!news) throw createError(404, 'news not found');
		res.json(news);
	})
);

router.post(
	'/',
	authHandler('teacher'),
	asyncErrorHandler(async (req, res) => {
		if (!(req.user.id === req.body.author || req.user.isSuperuser))
			throw createError(403, 'forbidden');
		const { value, error } = newsValidationSchema.validate(req.body);
		if (error) throw createError(400, error.details[0].message);
		const newsService = await getNewsService();
		const news = await newsService.create(value);
		res.status(201).json(news);
	})
);

router.patch(
	'/:id',
	validateObjectId,
	authHandler('teacher'),
	asyncErrorHandler(async (req, res) => {
		if (!(req.user.id === req.body.author || req.user.isSuperuser))
			throw createError(403, 'forbidden');
		const { value, error } = newsPatchSchema.validate(req.body);
		if (error) throw createError(400, error.details[0].message);
		const newsService = await getNewsService();
		const updatedNews = await newsService.update(req.params.id, value);
		if (!updatedNews) throw createError(404, 'news not found');
		res.json(updatedNews);
	})
);

router.delete(
	'/:id',
	validateObjectId,
	authHandler('teacher'),
	asyncErrorHandler(async (req, res) => {
		const newsService = await getNewsService();
		const news = await newsService.getById(req.params.id);
		if (!news) throw createError(404, 'news not found');
		if (!(req.user.id === news.author || req.user.isSuperuser))
			throw createError(403, 'forbidden');
		const deletedNews = await newsService.delete(req.params.id);
		res.status(200).send(deletedNews);
	})
);

module.exports = router;
