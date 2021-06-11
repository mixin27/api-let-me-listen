const { Artist } = require("../models/artist");

exports.getArtists = async (req, res) => {
  const artists = await Artist.find().sort("name");
  res.send(artists);
};

exports.postArtist = async (req, res) => {
  let artist = new Artist({ name: req.body.name });
  artist = await artist.save();
  res.send(artist);
};

exports.getArtistById = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist)
    return res.status(404).send("The artist with the given ID was not found.");

  res.send(artist);
};

// TODO: PUT and DELETE operations
