const queueService = require("../services/QueueServices");


exports.getAllQueues = async (req, res) => {
  try {
    
    const series = await seriesService.getAllQueues();
    res.json({ data: series, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.createQueue = async (req, res) => {
  try {
   
    const queue = await queueService.createQueue(req.body);
    res.json({ data: queue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};