const resolveRemoteIp = (req) => {
  const ip =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
  return ip.indexOf(':') >= 0 ? ip.substring(ip.lastIndexOf(':') + 1) : ip; // just ipv4
};

const resolveUserEmail = (req) => {
  let email = null;
  const tokenHeader = req.headers?.auth?.split(' ')[1];
  if (tokenHeader) {
    const token = tokenHeader.split('.')[1];
    if (token) {
      email = JSON.parse(Buffer.from(token, 'base64').toString())?.email;
    }
  }
  return email;
};

module.exports = {
  resolveRemoteIp,
  resolveUserEmail
};
