import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  updateProfileUser, getUser,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/me', getUser);
usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfileUser);

export default usersRoutes;
