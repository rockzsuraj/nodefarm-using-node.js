const config = {
  authRequired: process.env.AUTHREQUIRED,
  auth0Logout: process.env.AUTH0LOGOUT,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

module.exports = config;
