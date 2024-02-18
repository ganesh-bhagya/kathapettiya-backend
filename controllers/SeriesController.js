const seriesService = require("../services/SeriesServices");

exports.getAllSeries = async (req, res) => {
  try {
    
    const series = await seriesService.getAllSeries();
    res.json({ data: series, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSeries = async (req, res) => {
  try {
   
    const series = await seriesService.createSeries(req.body);
    res.json({ data: series, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editSeries = async (req, res) => {
  try {
    const updatedSeries = await seriesService.editSeries(req.params.id, req.body);
    res.json({ data: updatedSeries, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSeriesByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming user ID is passed as a parameter in the request
    const series = await seriesService.getSeriesByUser(userId);
    res.json({ data: series, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
