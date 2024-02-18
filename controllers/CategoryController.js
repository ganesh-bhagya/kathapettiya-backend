const categoryService = require("../services/CategoryServices");

exports.getAllCategories = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads`; // Assuming your images are served from the 'uploads' folder
    const categories = await categoryService.getAllCategories(baseUrl);

    res.json({ data: categories, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryByTitle = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads`; // Assuming your images are served from the 'uploads' folder
    const description = req.params.description.replaceAll("-", " ");
    const categories = await categoryService.getCategoryByTitle(
      baseUrl,
      description
    );
    res.json({ data: categories, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    console.log(req.body);
    const users = await categoryService.createCategory(req.body, req.file);
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.editCategory(
      req.params.id,
      req.body,
      req.file
    );
    res.json({ data: updatedCategory, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
