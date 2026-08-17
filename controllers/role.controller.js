const roleService = require("../services/role.service");

const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);

    return res.status(201).json({
      success: true,
      message: "Role created successfully.",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles(req.query);

    return res.status(200).json({
      success: true,
      message: "Roles fetched successfully.",
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role fetched successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const role = await roleService.deleteRole(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const assignPermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissionIds } = req.body;

    const rolePermissions = await roleService.assignPermissions(
      roleId,
      permissionIds,
    );

    return res.status(200).json({
      success: true,
      message: "Permissions assigned successfully.",
      data: rolePermissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissions,
};

