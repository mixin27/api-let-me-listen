const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  url: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

function validateSong(song) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    length: Joi.number().required(),
  });
  return schema.validate(song);
}

exports.Song = Song;
exports.validate = validateSong;
