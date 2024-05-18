const router = require('express').Router();
const { createError } = require('../middlewares/errorHandler');
const { authHandler } = require('../middlewares/authHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');
const validateObjectId = require('../middlewares/validateObjectId');
const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');
const { userValidationSchema, userPatchSchema } = require('../validation');

function authorizeAction(authRoles, authUserId, targetUserId, targetRoles) {
  if (authRoles.includes('superuser'))
    return authUserId === targetUserId || authRoles[0] !== targetRoles;
  else if (authRoles.includes('teacher'))
    return authUserId === targetUserId || targetRoles.includes('student');
  else if (authRoles.includes('student')) return authUserId === targetUserId;
  else false;
}

const userService = new UserService();

router.get(
  '/',
  authHandler(),
  asyncErrorHandler(async (req, res) => {
    const users = await userService.getAll();
    return res.json(
      users.map((user) => {
        delete user.password;
        return user;
      })
    );
  })
);

router.get(
  '/:id',
  validateObjectId,
  authHandler(),
  asyncErrorHandler(async (req, res) => {
    const user = await userService.getById(req.params.id);
    if (!user) throw createError(404, 'user not found');
    delete user.password;
    res.json(user);
  })
);

router.post(
  '/',
  authHandler('teacher'),
  asyncErrorHandler(async (req, res) => {
    const { value, error } = userValidationSchema.validate(req.body);
    if (error) throw createError(400, error.details[0].message);
    let user = await userService.getByEmail(value.email);
    if (user) throw createError(400, 'email is already taken');
    if (!req.user.isSuperuser && !value?.roles?.includes('student'))
      throw createError(403, 'forbidden');
    const hashedPassword = AuthService.createPasswordHash(value.password);
    if (value.roles.includes('student')) value.approved = false;
    user = await userService.create({
      ...value,
      password: hashedPassword
    });
    res.status(201).json(user);
  })
);

router.patch(
  '/:id',
  validateObjectId,
  authHandler(),
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { roles } = req.user;
    let user = await userService.getById(id);
    if (!user) throw createError(404, 'user not found');
    if (!authorizeAction(roles, req.user.id, id, user.roles))
      throw createError(403, 'unauthorized');
    const { value, error } = userPatchSchema.validate(req.body);
    if (error) throw createError(400, error.details[0].message);
    if (!req.user.isSuperuser) {
      delete value?.email;
      delete value?.roles;
    }
    if (req.user.id === id || user.roles.includes('superuser'))
      delete value?.roles;
    if (value?.password)
      value.password = AuthService.createPasswordHash(value.password);
    else delete value.password;
    user = await userService.update(user.id, value);
    res.json(user);
  })
);

router.delete(
  '/:id',
  validateObjectId,
  authHandler(),
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { roles } = req.user;
    let user = await userService.getById(id);
    if (!user) throw createError(404, 'user not found');
    if (!authorizeAction(roles, req.user.id, id, user.roles))
      throw createError(403, 'unauthorized');
    user = await userService.update(id, {
      deletedAt: new Date(),
      active: false
    });
    res.status(200).send(user);
  })
);

module.exports = router;
