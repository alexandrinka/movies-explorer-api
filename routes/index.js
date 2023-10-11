import express from 'express';
import { celebrate, Joi } from 'celebrate';
import usersRoutes from './users';
import moviesRoutes from './movies';
import auth from '../middlewares/auth';
import NotFoundError from '../errors/not-found-err';
import { login, createUser } from '../controllers/users';

const routes = express.Router();

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);
routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

export default routes;
