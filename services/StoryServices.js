const { default: mongoose } = require("mongoose");
const StoryModel = require("../models/Story");
const {
  Types: { ObjectId },
} = require("mongoose");
const { formatStory, handleError } = require("../utils/sharedUtils");

exports.getAllNewStories = async (baseUrl) => {
  try {
    const stories = await StoryModel.find({
      status: "active",
      section: "novel",
    })
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
    const stories = await StoryModel.find({
      status: "active",
      section: "novel",
    })
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

exports.getAllPoems = async (baseUrl) => {
  try {
    const stories = await StoryModel.find({
      status: "active",
      section: "poem",
    })
      .populate("user")
      .populate("category");
    console.log(stories);
    const poemsWithImages = stories.map((story) => formatStory(story, baseUrl));

    return poemsWithImages;
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

    let tagIds = [];
    if (storyData.tags && typeof storyData.tags === "string") {
      // Splitting the tags string and removing any leading/trailing spaces
      tagIds = storyData.tags.split(",").map((tag) => tag.trim());
    } else if (Array.isArray(storyData.tags)) {
      // If tags are already provided as an array
      tagIds = storyData.tags.map((tag) => tag.toString());
    }

    const newStoryData = {
      title: storyData.title,
      category: categoryId,
      content: storyData.content,
      line: storyData.line,
      moderator_note: storyData.moderator_note,
      note: storyData.note,
      section: storyData.section,
      status: storyData.status,
      tags: tagIds.length !== 0 ? tagIds : [],
      user: storyData.user,
      image: image ? image.filename : undefined,
    };

    // Only include series if it's not null
    if (storyData.series !== null) {
      // Ensure storyData.series is a valid ObjectId before assigning it
      if (mongoose.Types.ObjectId.isValid(storyData.series)) {
        newStoryData.series = storyData.series;
      }
    }

    const newStory = new StoryModel(newStoryData);

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

exports.getStoriesByUser = async (baseUrl, userId) => {
  try {
    const stories = await StoryModel.find({ user: userId })
      .populate("user")
      .populate("tags")
      .populate("category");

    const formattedStories = stories.map((story) =>
      formatStory(story, baseUrl)
    );

    return formattedStories;
  } catch (error) {
    handleError(error);
  }
};
