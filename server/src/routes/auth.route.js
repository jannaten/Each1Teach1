const router = require('express').Router();
const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const FileService = require('../services/FileService');
const { userValidationSchema } = require('../validation');
const { loginValidationSchema } = require('../validation');
const { sharedContext } = require('../utilities/dbContext');
const { authHandler } = require('../middlewares/authHandler');
const { createError } = require('../middlewares/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');

const userToJson = (user, token) => ({
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
  createdAt: user.createdAt,
  token
});

const getFileService = async () => {
  const context = await sharedContext();
  return new FileService(context);
};

router.post(
  '/login',
  asyncErrorHandler(async (req, res) => {
    const { value, error } = loginValidationSchema.validate(req.body);
    if (error) throw createError(400, error.details[0].message);
    const authService = new AuthService();
    const { user, token } = await authService.login(value);
    if (user && token) return res.json(userToJson(user, token));
    throw createError(401, 'invalid user credentials');
  })
);

router.get(
  '/user',
  authHandler(),
  asyncErrorHandler(async (req, res) => {
    if (!req.user) throw createError(403, 'forbidden');
    const token = await AuthService.createToken(req.user);
    return res.json(userToJson(req.user, token));
  })
);

router.post(
  '/register',
  asyncErrorHandler(async (req, res) => {
    const { avatar, languages_to_learn, languages_for_teach } = req.body;
    const { value, error } = userValidationSchema.validate({
      ...req.body,
      avatar: JSON.parse(avatar),
      languages_to_learn: JSON.parse(languages_to_learn),
      languages_for_teach: JSON.parse(languages_for_teach)
    });
    if (error) throw createError(400, error.details[0].message);
    const userService = new UserService();
    let user = await userService.getByEmail(value.email);
    if (user) throw createError(400, 'email is already taken');
    const hashedPassword = AuthService.createPasswordHash(value.password);
    if (req.files && Object.keys(req.files).length) {
      const fileService = await getFileService();
      for (let [fileId, fileData] of Object.entries(req.files)) {
        const file = await fileService.create({ ...fileData, fileId });
        value.images = [file.id];
      }
    }
    user = await userService.create({
      ...value,
      approved: false,
      password: hashedPassword
    });
    const token = await AuthService.createToken(user);
    return res.status(201).json(userToJson(user, token));
  })
);

module.exports = router;
