import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  // If ADMIN_PASSWORD is not set, allow access without authentication
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return next();
  }

  const header = req.headers["authorization"] || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "JWT secret not configured" });
    }
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


