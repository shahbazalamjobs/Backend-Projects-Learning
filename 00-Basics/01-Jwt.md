Here are the **most common JWT-related code patterns** you’ll repeatedly use in a Node.js + Express backend (especially in MERN apps). I’ll keep it **practical + reusable**, so you can plug this into your projects.

---

# 🔐 1. Install & Import

```bash
npm install jsonwebtoken
```

```js
import jwt from "jsonwebtoken";
```

---

# 🔑 2. Generate Token (Login / Signup)

👉 Used after user authentication

```js
const generateToken = (id) => {
  return jwt.sign(
    { id },                 // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "7d" }     // expiry
  );
};
```

✅ Usage:

```js
const token = generateToken(user._id);
res.json({ token });
```

---

# 🔍 3. Verify Token (Middleware)

👉 Protect routes (very important pattern)

```js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
```

---

# 🧱 4. Protect Routes

```js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
```

---

# 🧾 5. Decode Token (Without Verification)

👉 Rare use (debugging/logging only)

```js
const decoded = jwt.decode(token);
console.log(decoded);
```

---

# 🔄 6. Refresh Token Pattern (Important for Scaling)

👉 Short-lived access token + long-lived refresh token

### Generate both:

```js
const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: "15m",
});

const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, {
  expiresIn: "7d",
});
```

---

### Refresh API:

```js
export const refreshToken = (req, res) => {
  const token = req.body.refreshToken;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
```

---

# 🚪 7. Logout (Stateless Way)

👉 JWT is stateless → no direct logout
👉 Common solution: **client deletes token**

OR advanced:

### Token Blacklist (Redis)

```js
// pseudo
await redis.set(token, "blacklisted", "EX", 3600);
```

---

# 🛑 8. Role-Based Access Control (RBAC)

```js
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
```

### Usage:

```js
router.get("/admin", protect, authorize("admin"), handler);
```

---

# 🍪 9. Send JWT in Cookie (Secure Way)

```js
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});
```

---

# ⚠️ 10. Common Errors Handling

```js
try {
  jwt.verify(token, process.env.JWT_SECRET);
} catch (err) {
  if (err.name === "TokenExpiredError") {
    console.log("Token expired");
  } else if (err.name === "JsonWebTokenError") {
    console.log("Invalid token");
  }
}
```

---

# 🧠 80/20 Summary (Pareto Principle)

Focus on just these 5 to become job-ready:

1. ✅ `jwt.sign()` → create token
2. ✅ `jwt.verify()` → validate token
3. ✅ `protect middleware` → secure routes
4. ✅ `Authorization: Bearer <token>` → send token
5. ✅ `RBAC middleware` → role-based access

---

If you want next level 🚀
I can show you:

* How JWT works internally (very important for interviews)
* Secure auth flow for your **job portal project**
* Common mistakes (this is what most devs get wrong)

Just tell me 👍
