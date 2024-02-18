const roleService = require("../services/RoleServices");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json({ data: roles, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req, res);
    res.json({ data: role, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
