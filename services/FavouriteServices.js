const FavouriteModel = require("../models/Favourite");
const StoryModel = require("../models/Story");
const { formatStory } = require("../utils/sharedUtils");

exports.getAllFavourites = async () => {
  try {
    const favourites = await FavouriteModel.find();
    return favourites;
  } catch (error) {
    throw new Error(`Error fetching series: ${error.message}`);
  }
};

exports.createFavourite = async (favouriteData) => {
  try {
    // Check if the queue already exists for the user
    const existingFavourite = await FavouriteModel.findOne({ users: favouriteData.userId });

    if (existingFavourite) {
      // If the queue exists, update it
      existingFavourite.stories.push(favouriteData.story);
      await existingFavourite.save();
      return existingFavourite;
    } else {
      // If the queue doesn't exist, create a new one
      const newFavourite = new FavouriteModel({
        users: favouriteData.userId,
        stories: [favouriteData.story],
      });
      await newFavourite.save();
      return newFavourite;
    }
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating Favourite:", error);
    throw error;
  }
};

exports.getFavouriteByUser = async (baseUrl, userId) => {
  try {
    const favourite = await FavouriteModel.findOne({ users: userId }).populate(
      "stories"
    );

    if (!favourite) {
      throw new Error("favourite not found for the user");
    }

    // Extract story IDs from the favourite
    const storyIds = favourite.stories.map((story) => story._id);

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
