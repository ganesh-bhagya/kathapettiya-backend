const CategoryModel = require("../models/Category");
const StoryModel = require("../models/Story");
const { formatStory, handleError } = require("../utils/sharedUtils");

exports.getAllCategories = async (baseUrl) => {
  try {
    const categories = await CategoryModel.find();
    // Map each category to include the image path
    const categoriesWithImages = categories.map((category) => {
      return {
        _id: category._id,
        description: category.description,
        // Assuming imagePath is the field where the image path is stored in CategoryModel
        imagePath: category.image,
        // Constructing the imageUrl using the provided baseUrl
        imageUrl: `${baseUrl}/${category.image}`,
      };
    });
    return categoriesWithImages;
  } catch (error) {
    handleError(error);
  }
};

exports.getCategoryByTitle = async (baseUrl, description) => {
  try {
    const category = await CategoryModel.findOne({ description: description });

    const stories = await StoryModel.find({ category: category._id })
      .populate("user")
      .populate("tags")
      .populate("category");

    const storiesWithImages = stories.map((story) =>
      formatStory(story, baseUrl)
    );

    const categoryWithImage = {
      _id: category._id,
      description: category.description,
      // Assuming imagePath is the field where the image path is stored in CategoryModel
      imagePath: category.image,
      // Constructing the imageUrl using the provided baseUrl
      imageUrl: `${baseUrl}/${category.image}`,
      stories: storiesWithImages,
    };

    return categoryWithImage;
  } catch (error) {
    handleError(error);
  }
};

exports.createCategory = async (categoryData, image) => {
  try {
    const newCategory = new CategoryModel({
      description: categoryData.description,
      image: image ? image.filename : undefined, // Save the path of the uploaded image
      stories: categoryData.stories || [],
    });
    await newCategory.save();
    return newCategory;
  } catch (error) {
    handleError(error);
  }
};

exports.editCategory = async (categoryId, categoryData, image) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        description: categoryData.description,
        image: image && image.filename,
        stories: categoryData.stories || [],
      },
      { new: true }
    );
    return updatedCategory;
  } catch (error) {
    handleError(error);
  }
};
