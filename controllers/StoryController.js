const storyService = require("../services/StoryServices");

const getBaseUrl = (req) => {
  return `${req.protocol}://${req.get('host')}/uploads`;
};

const handleError = (res, err) => {
  res.status(500).json({ error: err.message });
};

exports.getAllStories = async (req, res) => {
  try {
    const baseUrl = getBaseUrl(req);
    const stories = await storyService.getAllStories(baseUrl);
    res.json({ data: stories, status: "success" });
  } catch (err) {
    handleError(res, err);
  }
};

exports.getAllNewStories = async (req, res) => {
  try {
    const baseUrl = getBaseUrl(req);
    const stories = await storyService.getAllNewStories(baseUrl);
    res.json({ data: stories, status: "success" });
  } catch (err) {
    handleError(res, err);
  }
};

exports.getAllStoriesByTitle = async (req, res) => {
  try {
    const title = req.params.title.replaceAll("-", " ");
    const baseUrl = getBaseUrl(req);
    const stories = await storyService.getAllStoriesByTitle(baseUrl, title);
    res.json({ data: stories, status: "success" });
  } catch (err) {
    handleError(res, err);
  }
};

exports.createStory = async (req, res) => {
  try {
    const users = await storyService.createStory(req.body, req.file);
    res.json({ data: users, status: "success" });
  } catch (err) {
    handleError(res, err);
  }
};

exports.editStory = async (req, res) => {
  try {
    const updatedStory = await storyService.editStory(req.params.id, req.body, req.file);
    res.json({ data: updatedStory, status: "success" });
  } catch (err) {
    handleError(res, err);
  }
};
