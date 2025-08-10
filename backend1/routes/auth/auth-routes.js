const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkAuthStatusMiddleware, // Import the new middleware
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Use the new, lenient middleware for check-auth
router.get("/check-auth", checkAuthStatusMiddleware, (req, res) => {
  const user = req.user; // This will be populated if authenticated, or null/undefined if not

  if (user) {
    // User is authenticated
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  } else {
    // User is NOT authenticated
    res.status(200).json({
      success: false,
      message: "User not authenticated.",
      user: null, // Explicitly send null for user
    });
  }
});
module.exports = router;