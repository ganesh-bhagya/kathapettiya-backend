const SeriesModel = require("../models/Series");

exports.getAllSeries = async () => {
  try {
    const series = await SeriesModel.find();
    return series;
  } catch (error) {
    throw new Error(`Error fetching series: ${error.message}`);
  }
};

exports.createSeries = async (seriesData) => {
  try {
    const newSeries = new SeriesModel({
      description: seriesData.description,
      user: seriesData.userId,
      stories: seriesData.stories || [],
    });
    await newSeries.save();
    return newSeries;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating tag:", error);
    throw error;
  }
};

exports.editSeries = async (seriesId, seriesData) => {
  try {
    const updatedSeries = await SeriesModel.findByIdAndUpdate(
      seriesId,
      {
        description: seriesData.description,
        stories: seriesData.stories || [],
      },
      { new: true }
    );
    return updatedSeries;
  } catch (error) {
    console.error("Error editing tag:", error);
    throw error;
  }
};

exports.getSeriesByUser = async (userId) => {
  try {
    const series = await SeriesModel.find({ user: userId });
    return series;
  } catch (error) {
    throw new Error(`Error fetching series: ${error.message}`);
  }
};
