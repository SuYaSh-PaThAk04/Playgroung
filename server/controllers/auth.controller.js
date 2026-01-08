import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.JWT_SECRET;

  // If auth is not configured, return a message
  if (!adminPassword || !secret) {
    return res.status(400).json({ 
      error: "Authentication is not configured. Set ADMIN_PASSWORD and JWT_SECRET to enable auth." 
    });
  }

  if (!password || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin" },
    secret,
    { expiresIn: "2h" }
  );

  res.json({ token });
};


