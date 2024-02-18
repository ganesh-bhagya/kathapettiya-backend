const TagModel = require("../models/Tag");

exports.getAllTags = async () => {
  try {
    const tags = await TagModel.find();
    return tags;
  } catch (error) {
    throw new Error(`Error fetching tags: ${error.message}`);
  }
};

exports.getAllTagsStories = async (tagName) => {
  try {
    const tag = await TagModel.findOne({ description: tagName }).populate("stories");
    return tag; // Assuming you want to return a single tag, not an array
  } catch (error) {
    throw new Error(`Error fetching series: ${error.message}`);
  }
};

exports.createTag = async (tagData) => {
  try {
    const newTag = new TagModel({
      description: tagData.description,
      stories: tagData.stories || [],
    });
    await newTag.save();
    return newTag;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tag:", error);
    throw error;
  }
};


exports.editTag = async (tagId, tagData) => {
  try {
    const updatedTag = await TagModel.findByIdAndUpdate(
      tagId,
      {
        description: tagData.description,
        stories: tagData.stories || [],
      },
      { new: true }
    );
    return updatedTag;
  } catch (error) {
    console.error("Error editing tag:", error);
    throw error;
  }
};