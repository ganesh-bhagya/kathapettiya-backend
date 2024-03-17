const queueService = require("../services/QueueServices");

const getBaseUrl = (req) => {
  return `${req.protocol}://${req.get("host")}/uploads`;
};

exports.createQueue = async (req, res) => {
  try {
    const queue = await queueService.createQueue(req.body);
    res.json({ data: queue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQueueByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming user ID is passed as a parameter in the request
    const baseUrl = getBaseUrl(req);
    const queue = await queueService.getQueueByUser(baseUrl, userId);
    res.json({ data: queue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
