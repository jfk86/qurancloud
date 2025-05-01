// middleware/roleAuth.js
module.exports = function(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // If roles is a string, convert to array
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Not authorized for this resource' });
    }

    next();
  };
};