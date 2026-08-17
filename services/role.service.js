const Role = require("../models/role.model");
const RolePermission = require("../models/rolePermission.model");
const Permission = require("../models/permission.model");

const createRole = async (roleData) => {
  return await Role.create(roleData);
};

const getAllRoles = async (query = {}) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const offset = (page - 1) * limit;
  return await Role.findAndCountAll({ limit, offset });
};

const getRoleById = async (id) => {
  return await Role.findByPk(id, { include: [{ model: Permission, as: 'permissions' }] });
};

const updateRole = async (id, roleData) => {
  const role = await Role.findByPk(id);

  if (!role) {
    return null;
  }

  await role.update(roleData);

  return role;
};

const deleteRole = async (id) => {
  const role = await Role.findByPk(id);

  if (!role) {
    return null;
  }

  await role.destroy();

  return role;
};

const assignPermissions = async (roleId, permissionIds) => {
  await RolePermission.destroy({
    where: {
      roleId,
    },
  });

  const rolePermissions = permissionIds.map((permissionId) => ({
    roleId,
    permissionId,
  }));

  await RolePermission.bulkCreate(rolePermissions);

  return rolePermissions;
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissions,
};


