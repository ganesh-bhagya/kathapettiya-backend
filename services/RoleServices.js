const RoleModel = require("../models/Role");

exports.getAllRoles = async () => {
  return await RoleModel.find();
};

exports.createRole = async (req, res) => {
  try {
    const newRole = await RoleModel.create(req.body);
    return newRole;
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating role:", error);
    throw error;
  }
};
