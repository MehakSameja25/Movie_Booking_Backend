const Permission = require("../models/permission.model");

const createPermission = async (permissionData) => {
  const permission = await Permission.create(permissionData);

  return permission;
};

const getAllPermissions = async (query = {}) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const offset = (page - 1) * limit;
  return await Permission.findAndCountAll({ limit, offset });
};

const getPermissionById = async (id) => {
  const permission = await Permission.findOne({
    where: {
      id,
    },
  });

  return permission;
};

const updatePermission = async (id, permissionData) => {
  const permission = await getPermissionById(id);

  if (!permission) {
    return null;
  }

  await permission.update(permissionData);

  return permission;
};

const deletePermission = async (id) => {
  const permission = await Permission.findOne({
    where: {
      id,
    },
  });

  if (!permission) {
    return null;
  }

  await permission.destroy();

  return permission;
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};

