const { default: mongoose } = require("mongoose");
const StoryModel = require("../models/Story");
const {
  Types: { ObjectId },
} = require("mongoose");
const { formatStory, handleError } = require("../utils/sharedUtils");

exports.getAllNewStories = async (baseUrl) => {
  try {
    const stories = await StoryModel.find({ status: "active" })
      .populate("user")
      .populate("tags")
      .populate("category")
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(6); // Limit the results to 6 items;

    const storiesWithImages = stories.map((story) =>
      formatStory(story, baseUrl)
    );

    return storiesWithImages;
  } catch (error) {
    handleError(error);
  }
};

exports.getAllStories = async (baseUrl) => {
  try {
    const stories = await StoryModel.find({ status: "active" })
      .populate("user")
      .populate("tags")
      .populate("category");

    const storiesWithImages = stories.map((story) =>
      formatStory(story, baseUrl)
    );

    return storiesWithImages;
  } catch (error) {
    handleError(error);
  }
};

exports.getAllStoriesByTitle = async (baseUrl, title) => {
  try {
    const story = await StoryModel.findOne({ title: title })
      .populate("user")
      .populate("tags")
      .populate("category");

    const formattedStory = formatStory(story, baseUrl);

    return formattedStory;
  } catch (error) {
    handleError(error);
  }
};

exports.createStory = async (storyData, image) => {
  try {
    const categoryId = storyData.category
      ? new ObjectId(storyData.category)
      : null;

    const tagIds =
      storyData.tags && typeof storyData.tags === "string"
        ? storyData.tags.split(",").map((tag) => new ObjectId(tag.trim()))
        : [];

    const newStory = new StoryModel({
      title: storyData.title,
      category: categoryId,
      content: storyData.content,
      line: storyData.line,
      moderator_note: storyData.moderator_note,
      note: storyData.note,
      section: storyData.section,
      series: storyData.series,
      status: storyData.status,
      tags: tagIds,
      user: storyData.user,
      image: image ? image.filename : undefined,
    });

    await newStory.save();
    return newStory;
  } catch (error) {
    handleError(error);
  }
};

exports.editStory = async (storyId, storyData, image) => {
  try {
    const updatedStory = await StoryModel.findByIdAndUpdate(
      storyId,
      {
        description: storyData.description,
        image: image && image.filename,
        stories: storyData.stories || [],
      },
      { new: true }
    );

    return updatedStory;
  } catch (error) {
    handleError(error);
  }
};
