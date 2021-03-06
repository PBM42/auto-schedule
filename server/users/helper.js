var jwt = require('jsonwebtoken');

function minimizeUserAgent(ua) {
  return JSON.stringify(Object.keys(ua)
               .filter(key => ua[key] !== false)
               .reduce((res, key) => (res[key] = ua[key], res), {}));
}

exports.createDevice = (req) => {
  const ua = minimizeUserAgent(req.useragent);
  console.log(ua);
  console.log('ip', req.ip);
  return {
    ips: [req.ip],
    userAgent: ua,
    name: `${req.useragent.os} - ${req.useragent.browser}`,
  };
}

exports.addTokenToDevice = (user) => {
  const payload = {
    userId: user._id,
    deviceId: user.devices[0]._id,
  };
  const token = jwt.sign(payload, require('./secret').token.client);
  user.devices[0].token = token;
  return user.save();
}
