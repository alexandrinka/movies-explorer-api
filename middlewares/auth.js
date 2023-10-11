import jwt from 'jsonwebtoken';
import NotAutorization from '../errors/not-autorization.js';

const { JsonWebTokenError } = jwt;

const checkAuthentication = async (req, res, next) => {
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) throw new NotAutorization('Не авторизован');

    const token = authorization.split(' ')[1];
    const parsedToken = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    if (parsedToken) {
      req.user = {
        _id: parsedToken._id,
      };
      next();
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      next(new NotAutorization('Не авторизован'));
    } else {
      next(err);
    }
  }
};

export default checkAuthentication;
