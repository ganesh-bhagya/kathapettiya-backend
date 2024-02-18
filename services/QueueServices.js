const QueueModel = require("../models/Queue");

exports.getAllQueues = async () => {
  try {
    const queues = await QueueModel.find();
    return queues;
  } catch (error) {
    throw new Error(`Error fetching series: ${error.message}`);
  }
};

exports.createQueue = async (queueData) => {
  try {
    // Check if the queue already exists for the user
    const existingQueue = await QueueModel.findOne({ user: queueData.userId });

    if (existingQueue) {
      // If the queue exists, update it
      existingQueue.stories.push(queueData.story);
      await existingQueue.save();
      return existingQueue;
    } else {
      // If the queue doesn't exist, create a new one
      const newQueue = new QueueModel({
        user: queueData.userId,
        stories: [queueData.story],
      });
      await newQueue.save();
      return newQueue;
    }
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tag:", error);
    throw error;
  }
};


// exports.getSeriesByUser = async (userId) => {
//   try {
//     const series = await SeriesModel.find({ user: userId });
//     return series;
//   } catch (error) {
//     throw new Error(`Error fetching series: ${error.message}`);
//   }
// };
