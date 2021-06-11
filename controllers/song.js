const songs = [
  { title: "Song #1", length: 3 },
  { title: "Song #2", length: 3 },
  { title: "Song #3", length: 3 },
];

exports.getSongs = async (req, res, next) => {
  res.status(200).send(songs);
};
