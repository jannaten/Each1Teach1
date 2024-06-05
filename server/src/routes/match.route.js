const router = require('express').Router();
const { authHandler } = require('../middlewares/authHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');
const UserService = require('../services/UserService');

const userJSON = (user) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  loginName: `${user.firstName} ${user.lastName}`,
  roles: user.roles,
  avatar: user.avatar,
  email: user.email,
  description: user.description,
  approved: user.approved,
  expiresAt: user.expiresAt,
  lastUserAccess: user.lastUserAccess,
  images: user.images,
  languages_to_learn: user.languages_to_learn,
  languages_for_teach: user.languages_for_teach,
  deletedAt: user.deletedAt,
  updatedAt: user.updatedAt,
  createdAt: user.createdAt
});

function calculateMatchPercentage(learnLang, teachLang) {
  const levelWeight = { a1: 1, a2: 2, b1: 3, b2: 4, c1: 5, c2: 6 };
  if (learnLang.language !== teachLang.language) return 0;
  let matchPercentage = 100;
  const levelDiff = levelWeight[teachLang.level] - levelWeight[learnLang.level];
  if (levelDiff > 0) matchPercentage -= 10 * levelDiff;
  else matchPercentage -= 5 * Math.abs(levelDiff);
  const creditDiff = Math.abs(teachLang.credits - learnLang.credits);
  matchPercentage -= 2 * creditDiff;
  matchPercentage = Math.max(0, Math.min(100, matchPercentage));
  return matchPercentage;
}

router.get(
  '/',
  authHandler('student'),
  asyncErrorHandler(async (req, res) => {
    const userService = new UserService();
    const users = await userService.getAll({
      roles: ['student'],
      _id: { $ne: req.user.id },
      active: true,
      approved: true
    });
    let matchUsers = [];
    users.map((user) => {
      matchUsers.push(user.toObject());
      return user;
    });
    if (matchUsers.length > 0)
      matchUsers.map((user) => {
        user.languages_for_teach?.map((lang) => {
          req.user.languages_to_learn.map((el) => {
            if (lang.language !== el.language) return el;
            lang.match_percentage = calculateMatchPercentage(el, lang);
            return el;
          });
          return lang;
        });
        return user;
      });
    matchUsers.sort((a, b) => {
      const aMatchPercentage =
        a.languages_for_teach?.find((lang) => lang.match_percentage)
          ?.match_percentage || 0;
      const bMatchPercentage =
        b.languages_for_teach?.find((lang) => lang.match_percentage)
          ?.match_percentage || 0;
      return bMatchPercentage - aMatchPercentage;
    });
    res.json(matchUsers.map((user) => userJSON(user)));
  })
);

// router.get(
//   '/:id',
//   validateObjectId,
//   asyncErrorHandler(async (req, res) => {
//     const newsService = await getNewsService();
//     const news = await newsService.getById(req.params.id);
//     if (!news) throw createError(404, 'news not found');
//     res.json(news);
//   })
// );

// router.post(
//   '/',
//   authHandler('teacher'),
//   asyncErrorHandler(async (req, res) => {
//     const { value, error } = newsValidationSchema.validate(req.body);
//     if (error) throw createError(400, error.details[0].message);
//     const newsService = await getNewsService();
//     const news = await newsService.create(value);
//     res.status(201).json(news);
//   })
// );

// router.patch(
//   '/:id',
//   validateObjectId,
//   authHandler('teacher'),
//   asyncErrorHandler(async (req, res) => {
//     const { value, error } = newsPatchSchema.validate(req.body);
//     if (error) throw createError(400, error.details[0].message);
//     const newsService = await getNewsService();
//     const updatedNews = await newsService.update(req.params.id, value);
//     if (!updatedNews) throw createError(404, 'news not found');
//     res.json(updatedNews);
//   })
// );

// router.delete(
//   '/:id',
//   validateObjectId,
//   authHandler('teacher'),
//   asyncErrorHandler(async (req, res) => {
//     const newsService = await getNewsService();
//     const news = await newsService.getById(req.params.id);
//     if (!news) throw createError(404, 'news not found');
//     const deletedNews = await newsService.delete(req.params.id);
//     res.status(200).send(deletedNews);
//   })
// );

module.exports = router;
