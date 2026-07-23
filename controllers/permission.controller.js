const permissionService = require("../services/permission.service");

const createPermission = async (req, res) => {
  try {
    const permission = await permissionService.createPermission(req.body);

    return res.status(201).json({
      success: true,
      message: "Permission created successfully.",
      data: permission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await permissionService.getAllPermissions();

    return res.status(200).json({
      success: true,
      message: "Permissions fetched successfully",
      data: permissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPermissionById = async (req, res) => {
  try {
    const permission = await permissionService.getPermissionById(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: permission,
      message: "Permission fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const permission = await permissionService.updatePermission(
      req.params.id,
      req.body,
    );

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Permission updated successfully.",
      data: permission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePermission = async (req, res) => {
  try {
    const permission = await permissionService.deletePermission(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Permission deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
