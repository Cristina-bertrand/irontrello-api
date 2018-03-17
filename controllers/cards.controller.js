

const mongoose = require('mongoose');
const Card = require('../models/card.model');
const ApiError = require('../models/api-error.model');

module.exports.index = (req, res, next) => {
  Card.find()
    .then(cards => {
      res.json(cards)
    })
    .catch(error => next(error))
};

module.exports.show = (req, res, next) => {
  const id = req.params.id;
  Card.findById(id)
    .then(card => {
      if (card) {
        res.json(card)
      } else {
        next(new ApiError('Card not found', 404))
      }
    })
    .catch(error => next(error))
};

module.exports.create = (req, res, next) => {
  const card = new Card(req.body);
  card.save()
    .then(() => {
      res.status(201).json(card);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.log(error);
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
};

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  Card.findByIdAndUpdate(id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      list: req.body.list
    }
  }, { new: true })
    .then(card => {
      if (card) {
        res.status(200).send(card)
      }
      else {
        next(new ApiError("Card not found", 404))
      }
    })
    .catch(error => next(error))
}


module.exports.destroy = (req, res, next) => {
  const id = req.params.id;
  Card.findByIdAndRemove(id)
    .then(card => {
      if (card) {
        res.status(204).json()
      }
      else {
        next(new ApiError("Card not found", 404))
      }
    })
    .catch(error => next(error))
}

