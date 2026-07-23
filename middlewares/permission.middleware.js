const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const permissions = req.user.permissions;

    if (permissions.includes("*")) {
      return next();
    }

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to perform this action.",
      });
    }

    next();
  };
};

module.exports = {
  checkPermission,
};
