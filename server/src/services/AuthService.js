const UserService = require('./UserService');
const jwt = require('jsonwebtoken');
const { createSHA256, compareSHA256 } = require('../utilities/crypto');
const { logger } = require('../utilities/logger');
const {
  SERVER_TOKEN_SECRET: tokenSecret,
  SERVER_PASSWORD_SECRET: passwordSecret,
  SERVER_DOMAIN: domain
} = process.env;

class AuthService {
  constructor() {
    this.auth = { service: true };
    this.userService = new UserService();
  }

  localLogin = async function (email, password) {
    const user = await this.userService.getByEmail(email);
    if (user && !user.deletedAt) {
      const validPassword = AuthService.comparePasswordHash(
        password,
        user.password
      );
      if (validPassword) {
        const token = await AuthService.createToken(user);
        return { user, token };
      }
    }
    return { user: null, token: null };
  };

  login = async function (body) {
    return await this.localLogin(body.email, body.password);
    // switch (this.auth.service) {
    //   case 'local':
    //     console.log('I came here !');
    //     return await this.localLogin(req.body.email, req.body.password);
    // }
    // // logger.error(
    // //   `[${this.constructor.name}] Invalid auth service (config.auth.service): ${this.auth.service} for organization: ${this.organization.name}`
    // // );
    // return { user: null, token: null };
  };

  getUserByToken = async function (token) {
    const decodedToken = await AuthService.decodeToken(token);
    if (decodedToken) {
      return await this.userService.getById(decodedToken.id);
    }
    return null;
  };

  static createToken = async function (user, expiresIn = '365d') {
    return await jwt.sign(
      {
        id: user.id,
        email: user.email,
        roles: user.roles
      },
      tokenSecret,
      {
        expiresIn
      }
    );
  };

  static tokenToUrl(path, token) {
    const formattedPath = path.replace(/^\/|\/$/, '');
    const formattedToken = token.split('.').join('/');
    return `${domain}/${formattedPath}/${formattedToken}`;
  }

  static decodeToken = async function (token) {
    return await jwt.verify(token, tokenSecret);
  };

  static createPasswordHash = function (password) {
    return createSHA256(password, passwordSecret);
  };

  static comparePasswordHash = function (password, hash) {
    return compareSHA256(password, passwordSecret, hash);
  };
}

module.exports = AuthService;
