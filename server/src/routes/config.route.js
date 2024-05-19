const router = require('express').Router();
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
    function getRandomNumber() {
      return Math.floor(Math.random() * 21);
    }
    const languages = config[0]?.languages[0].map((el) => ({
      language: el.label,
      students: getRandomNumber(),
      teachers: getRandomNumber()
    }));
    return res.json(languages);
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
