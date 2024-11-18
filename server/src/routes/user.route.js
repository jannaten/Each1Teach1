const router = require('express').Router();
const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');
const FileService = require('../services/FileService');
const { sharedContext } = require('../utilities/dbContext');
const { authHandler } = require('../middlewares/authHandler');
const { createError } = require('../middlewares/errorHandler');
const asyncErrorHandler = require('../middlewares/asyncMiddleware');
const validateObjectId = require('../middlewares/validateObjectId');
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

const getFileService = async () => {
  const context = await sharedContext();
  return new FileService(context);
};

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
    const { avatar, roles, languages_to_learn, languages_for_teach } = req.body;
    const { value, error } = userValidationSchema.validate({
      ...req.body,
      roles: JSON.parse(roles),
      avatar: JSON.parse(avatar),
      languages_to_learn: JSON.parse(languages_to_learn),
      languages_for_teach: JSON.parse(languages_for_teach)
    });
    if (error) throw createError(400, error.details[0].message);
    let user = await userService.getByEmail(value.email);
    if (user) throw createError(400, 'email is already taken');
    if (!req.user.isSuperuser && !value?.roles?.includes('student'))
      throw createError(403, 'forbidden');
    const hashedPassword = AuthService.createPasswordHash(value.password);
    if (req.files && Object.keys(req.files).length) {
      const fileService = await getFileService();
      for (let [fileId, fileData] of Object.entries(req.files)) {
        const file = await fileService.create({ ...fileData, fileId });
        value.images = [file.id];
      }
    }
    value.approved = false;
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
    const { value, error } = userPatchSchema.validate({
      ...req.body,
      ...(req.body.id !== 'undefined' ? { id: JSON.parse(req.body.id) } : {}),
      ...(req.body.roles ? { roles: JSON.parse(req.body.roles) } : {}),
      ...(req.body.avatar ? { avatar: JSON.parse(req.body.avatar) } : {}),
      ...(req.body.languages_to_learn
        ? { languages_to_learn: JSON.parse(req.body.languages_to_learn) }
        : {}),
      ...(req.body.languages_for_teach
        ? { languages_for_teach: JSON.parse(req.body.languages_for_teach) }
        : {}),
      ...(req.body.deletedAt
        ? { deletedAt: JSON.parse(req.body.deletedAt) }
        : {})
    });
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
    const fileService = await getFileService();
    if (req.body?.status === 'deleted') {
      if (JSON.parse(value.images).length > 0)
        await fileService.delete(JSON.parse(value.images)[0]);
      value.images = [];
      delete value.status;
    }
    if (req.body?.status && req.body?.status[0]?.split(' ')[0] === 'replaced') {
      if (req.body?.status[0]?.split(' ')[1] !== 'undefined')
        await fileService.delete(JSON.parse(req.body?.status[0].split(' ')[1]));
      value.images = [];
      delete value.status;
    }
    if (req.files && Object.keys(req.files).length) {
      const existingImage = user.images[0];
      if (existingImage) await fileService.delete(existingImage);
      for (let [fileId, fileData] of Object.entries(req.files)) {
        const file = await fileService.create({ ...fileData, fileId });
        value.images = [file.id];
      }
    }
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
