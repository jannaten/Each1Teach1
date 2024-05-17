const router = require('express').Router();
const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const { userValidationSchema } = require('../validation');
const { loginValidationSchema } = require('../validation');
const { authHandler } = require('../middlewares/authHandler');
const { createError } = require('../middlewares/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');

const userToJson = (user, token) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  loginName: `${user.firstName} ${user.lastName}`,
  roles: user.roles,
  token
});

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
  asyncErrorHandler(async (req, res, next) => {
    if (!req.user) throw createError(403, 'forbidden');
    const token = await AuthService.createToken(req.user);
    return res.json(userToJson(req.user, token));
  })
);

router.post(
  '/register',
  asyncErrorHandler(async (req, res) => {
    const { value, error } = userValidationSchema.validate(req.body);
    if (error) throw createError(400, error.details[0].message);
    const userService = new UserService();
    let user = await userService.getByEmail(value.email);
    if (user) throw createError(400, 'email is already taken');
    const hashedPassword = AuthService.createPasswordHash(value.password);
    user = await userService.create({
      ...value,
      password: hashedPassword
    });
    const token = await AuthService.createToken(user);
    return res.status(201).json(userToJson(user, token));
  })
);

module.exports = router;
