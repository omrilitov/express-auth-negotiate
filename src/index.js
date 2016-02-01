'use strict';

import createError from 'http-errors';

export default () => {
  return (req, res, next) => {
    const auth = req.get('authorization');

    if (!auth) {
      return res.status(401).set('WWW-Authenticate', 'Negotiate').end();
    }

    if (auth.lastIndexOf('Negotiate') !== 0) {
      return next(createError(400, `Malformed authentication token ${auth}`));
    }

    req.auth = req.auth || {};
    req.auth.token = auth.substring('Negotiate '.length);

    next();
  };
};
