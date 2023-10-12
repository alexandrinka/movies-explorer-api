import Movie from '../models/Movie.js';
import NotFoundError from '../errors/not-found-err.js';
import InvalidRequest from '../errors/invalid-request.js';
import NoRight from '../errors/no-right.js';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

export const deleteMovieById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { movieId } = req.params;
    const checkRight = await Movie.findOne({ owner: { _id }, _id: movieId });
    if (!checkRight) throw new NoRight('Данный пользователь не может удалить эту карточку');

    const movie = await Movie.findByIdAndRemove(movieId);
    if (!movie) throw new NotFoundError('Запрашиваемая карточка не найдена');
    res.status(200).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};

export const createMovie = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const newMovie = await Movie.create(req.body);
    res.status(201).send(await newMovie.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new InvalidRequest('Неправильные данные'));
    } else {
      next(err);
    }
  }
};
