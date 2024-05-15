const AuthService = require('../services/AuthService');
const { createError } = require('./errorHandler');

const authHandler =
  (...permissions) =>
  async (req, res, next) => {
    try {
      const authorization = req.get('auth');
      if (authorization) {
        const token = authorization.split(' ')[1];
        if (token) {
          const authService = new AuthService();
          const user = await authService.getUserByToken(token);
          if (user) {
            if (!user.isSuperuser && permissions?.length) {
              for (let permission of permissions) {
                if (!user.hasRole(permission)) {
                  throw createError(403, 'forbidden');
                }
              }
            }
            req.user = user;
            return next();
          }
        }
      }
      throw createError(401, 'unauthorized');
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  authHandler
};
