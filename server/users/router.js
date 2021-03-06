var router = require('express').Router();
var useragent = require('express-useragent');

module.exports = (options) => {
  /**
   * body: { }
   * response: { token: token }
   */
  router.post('/partial-login', useragent.express(), require('./partial-login.controller')());

  /**
   * body: { token: token, userInfo: { password: new Password, oldPassword: str, email: str } }
   */
  router.post('/update-user', require('./update-user.controller')());

  /**
   * body: { token: old token from partial-login, userInfo: { password: new Password, oldPassword: str, email: str } }
   * response: { token: token }
   */
  router.post('/login', useragent.express(), require('./login.controller')());

  /**
   * body: { token: token, agentNames: { added: [string], removed: [string] } }
   * response: tokens: [{ agent: { name: string, url: string }, token: token }]
   */
  router.post('/update-agents', require('./update-agents.controller')());
  router.get('/list-agents', require('./list-agents.controller')());
  return router;
};
