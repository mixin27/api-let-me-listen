const mongoose = require("mongoose");
const Joi = require("joi");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Artist = mongoose.model("Artist", artistSchema);

function validateArtist(artist) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(artist);
}

exports.Artist = Artist;
exports.validate = validateArtist;
