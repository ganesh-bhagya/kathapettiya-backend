const tagService = require("../services/TagServices");

exports.getAllTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json({ data: tags, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllTagsStories = async (req, res) => {
  try {
    const tagName = req.params.tagName;
    const tags = await tagService.getAllTagsStories(tagName);
    res.json({ data: tags, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.createTag = async (req, res) => {
  try {
    const tags = await tagService.createTag(req.body);
    res.json({ data: tags, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editTag = async (req, res) => {
  try {
    console.log(req.body);
    const updatedTag = await tagService.editTag(req.params.id, req.body);
    res.json({ data: updatedTag, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
