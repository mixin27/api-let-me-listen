const { Artist } = require("../models/artist");

exports.getArtists = async (req, res) => {
  const artists = await Artist.find().sort("name");
  res.send(artists);
};

exports.getArtistById = async (req, res) => {};

exports.postArtist = async (req, res) => {
  let artist = new Artist({ name: req.body.name });
  artist = await artist.save();
  res.send(artist);
};
