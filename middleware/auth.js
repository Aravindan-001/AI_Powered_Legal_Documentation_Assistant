
// This is a simplified middleware. In production, use JWT or sessions.
export const authenticate = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'] || 'student';

  if (!userId) {
    return res.status(401).json({ message: 'User ID required in headers' });
  }

  req.user = {
    id: userId,
    role: userRole
  };
  next();
};

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
