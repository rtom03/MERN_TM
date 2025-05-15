import express from "express";
import {
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotification,
  getTeamList,
  //   getUserTaskStatus,
  loginUser,
  logoutUser,
  markNotificationAsRead,
  registerUser,
  updateUserProfile,
} from "../controller/userController.js";
import { isAdminRoute, protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/get-team", protectedRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectedRoute, getNotification);
// router.get("/get-status", protectRoute, isAdminRoute, getUserTaskStatus);

router.put("/profile", protectedRoute, updateUserProfile);
router.put("/read-noti", protectedRoute, markNotificationAsRead);
router.put("/change-password", protectedRoute, changeUserPassword);
// //   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .put(protectedRoute, isAdminRoute, activateUserProfile)
  .delete(protectedRoute, isAdminRoute, deleteUserProfile);

export default router;
