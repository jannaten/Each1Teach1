const router = require('express').Router();
const UserService = require('../services/UserService');
const ConfigService = require('../services/ConfigService');
const { authHandler } = require('../middlewares/authHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');

router.get(
  '/',
  asyncErrorHandler(async (req, res) => {
    const configService = new ConfigService();
    const config = await configService.getAll();
    return res.json(config);
  })
);

router.get(
  '/getLocalization',
  asyncErrorHandler(async (req, res) => {
    const configService = new ConfigService();
    const config = await configService.getAll();
    const userService = new UserService();
    const users = await userService.getAll({});
    const languageStats = config[0]?.languages.map((el) => {
      const languageLabel = el.label;
      const targetLanguage = el.value;
      const studentsCount = users.filter((user) =>
        user.languages_to_learn.some((lang) => lang.language === targetLanguage)
      ).length;
      const teachersCount = users.filter((user) =>
        user.languages_for_teach.some(
          (lang) => lang.language === targetLanguage
        )
      ).length;
      return {
        language: languageLabel,
        students: studentsCount,
        teachers: teachersCount
      };
    });
    languageStats?.sort((a, b) => {
      const totalA = a.students + a.teachers;
      const totalB = b.students + b.teachers;
      if (totalA === totalB) return b.students - a.students;
      return totalB - totalA;
    });
    return res.json(languageStats || []);
  })
);

router.post(
  '/',
  authHandler('teacher'),
  asyncErrorHandler(async (req, res) => {
    const configService = new ConfigService();
    const config = await configService.create({});
    res.status(201).json(config);
  })
);

module.exports = router;
