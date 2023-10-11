import express from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  createMovie, deleteMovieById, getMovies,
} from '../controllers/movies';

const usersRoutes = express.Router();

usersRoutes.get('/', getMovies);
usersRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);
usersRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/https?:\/\/(www)?[\w-]{1,32}\.[\w-]{1,32}[^\s@]*$/),
    trailerLink: Joi.string().required().regex(/https?:\/\/(www)?[\w-]{1,32}\.[\w-]{1,32}[^\s@]*$/),
    thumbnail: Joi.string().required().regex(/https?:\/\/(www)?[\w-]{1,32}\.[\w-]{1,32}[^\s@]*$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

export default usersRoutes;
