'use strict';

export default function negotiateMiddleware (req, res, next) {
  const auth = req.get('authorization');

  if (!auth) {
    return res.status(401).set('WWW-Authenticate', 'Negotiate');
  }

  if (auth.lastIndexOf('Negotiate') !== 0) {
    res.status(400);

    return `Malformed authentication token ${auth}`;
  }

  req.auth = req.auth || {};
  req.auth.token = auth.substring('Negotiate '.length);

  next();
}
