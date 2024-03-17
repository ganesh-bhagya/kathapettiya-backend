const QueueModel = require("../models/Queue");
const StoryModel = require("../models/Story");
const { formatStory } = require("../utils/sharedUtils");

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
    const existingQueue = await QueueModel.findOne({ users: queueData.userId });

    if (existingQueue) {
      // If the queue exists, update it
      existingQueue.stories.push(queueData.story);
      await existingQueue.save();
      return existingQueue;
    } else {
      // If the queue doesn't exist, create a new one
      const newQueue = new QueueModel({
        users: queueData.userId,
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

exports.getQueueByUser = async (baseUrl, userId) => {
  try {
    const queue = await QueueModel.findOne({ users: userId }).populate(
      "stories"
    );

    if (!queue) {
      throw new Error("Queue not found for the user");
    }

    // Extract story IDs from the queue
    const storyIds = queue.stories.map((story) => story._id);

    // Find the stories with the extracted IDs
    const stories = await StoryModel.find({
      _id: { $in: storyIds },
      status: "active",
      section: "novel",
    })
      .populate("user")
      .populate("tags")
      .populate("category");

    // Format stories with images
    const storiesWithImages = stories.map((story) =>
      formatStory(story, baseUrl)
    );

    return storiesWithImages;
  } catch (error) {
    throw new Error(`Error fetching series: ${error.message}`);
  }
};
