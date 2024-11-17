const router = require('express').Router();
const { chatSchema } = require('../validation');
const UserService = require('../services/UserService');
const ChatService = require('../services/ChatService');
const MatchService = require('../services/MatchService');
const { authHandler } = require('../middlewares/authHandler');
const { createError } = require('../middlewares/errorHandler');
const validateObjectId = require('../middlewares/validateObjectId');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');

const userJSON = (user) => ({
  id: user._id,
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
  createdAt: user.createdAt,
  invited: user.invited
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
    const matchService = new MatchService();
    const matches = await matchService.getAll();
    if (matchUsers.length > 0) {
      matchUsers = matchUsers.map((user) => {
        const match = matches.find(
          (m) =>
            (m.requestUser.toString() === req.user.id &&
              m.recipientUser.toString() === user._id.toString()) ||
            (m.requestUser.toString() === user._id.toString() &&
              m.recipientUser.toString() === req.user.id)
        );
        user.invited = match
          ? {
              matchId: match._id.toString(),
              requestUser: match.requestUser.toString(),
              recipientUser: match.recipientUser.toString(),
              status: match.status
            }
          : {};
        return user;
      });
    }
    res.json(matchUsers.map((user) => userJSON(user)));
  })
);

router.get('/all', authHandler('teacher'), async (req, res) => {
  const matchService = new MatchService();
  const matches = await matchService.getMatchesWithUsers();
  res.json(matches);
});

router.get(
  '/chats',
  authHandler('student'),
  asyncErrorHandler(async (req, res) => {
    const matchService = new MatchService();
    const matches = await matchService.getMatchesWithChats({
      $or: [{ requestUser: req.user.id }, { recipientUser: req.user.id }],
      $and: [{ status: 'approved' }]
    });
    res.json(matches);
  })
);

router.post(
  '/',
  authHandler('student'),
  asyncErrorHandler(async (req, res) => {
    const { requestUser, recipientUser } = req.body;
    const matchService = new MatchService();
    const existingMatch = await matchService.getExistingMatch(
      requestUser,
      recipientUser
    );
    if (existingMatch)
      return res.status(400).json({ message: 'Invitation already sent.' });
    const match = await matchService.create({ requestUser, recipientUser });
    res.status(201).json(match);
  })
);

router.post(
  '/chats',
  authHandler('student'),
  asyncErrorHandler(async (req, res) => {
    const chatService = new ChatService();
    const { value, error } = chatSchema.validate(req.body);
    if (error) throw createError(400, error.details[0].message);
    let message;
    message = await chatService.create(value);
    message = await chatService.getById(message.id);
    res.status(201).json(message);
  })
);

router.patch(
  '/chats/:id',
  validateObjectId,
  authHandler('student'),
  asyncErrorHandler(async (req, res) => {
    const chatService = new ChatService();
    const chat = await chatService.getById(req.params.id);
    if (!chat) throw createError(404, 'chat not found');
    let message;
    message = await chatService.update(req.params.id, req.body);
    message = await chatService.getById(message.id);
    res.json(message);
  })
);

router.put(
  '/:id',
  validateObjectId,
  authHandler('student'),
  asyncErrorHandler(async (req, res) => {
    const matchService = new MatchService();
    const match = await matchService.getById(req.params.id);
    if (!match) throw createError(404, 'match not found');
    const updatedMatch = await matchService.update(req.params.id, req.body);
    res.json(updatedMatch);
  })
);

router.delete(
  '/:id',
  validateObjectId,
  authHandler('student'),
  asyncErrorHandler(async (req, res) => {
    const matchService = new MatchService();
    const match = await matchService.getById(req.params.id);
    if (!match) throw createError(404, 'match not found');
    const deletedMatch = await matchService.delete(req.params.id);
    res.status(200).send(deletedMatch);
  })
);

module.exports = router;
