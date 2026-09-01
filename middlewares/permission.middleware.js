const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) { console.error("Missing req.user for route:", req.method, req.originalUrl); return res.status(401).json({ success: false, message: "Missing req.user" }); } const permissions = req.user.permissions;

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
