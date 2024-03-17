const favouriteService = require("../services/FavouriteServices");

const getBaseUrl = (req) => {
  return `${req.protocol}://${req.get("host")}/uploads`;
};

exports.createFavourite = async (req, res) => {
  try {
    const favourite = await favouriteService.createFavourite(req.body);
    res.json({ data: favourite, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFavouriteByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming user ID is passed as a parameter in the request
    const baseUrl = getBaseUrl(req);
    const favourite = await favouriteService.getFavouriteByUser(baseUrl, userId);
    res.json({ data: favourite, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
