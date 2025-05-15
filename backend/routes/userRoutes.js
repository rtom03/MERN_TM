import express from "express";
import {
  //   activateUserProfile,
  //   changeUserPassword,
  //   deleteUserProfile,
  //   getNotificationsList,
  //   getTeamList,
  //   getUserTaskStatus,
  //   loginUser,
  //   logoutUser,
  //   markNotificationRead,
  registerUser,
  //   updateUserProfile,
} from "../controller/userController.js";
// import { isAdminRoute, protectdRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

// router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
// router.get("/notifications", protectRoute, getNotificationsList);
// router.get("/get-status", protectRoute, isAdminRoute, getUserTaskStatus);

// router.put("/profile", protectRoute, updateUserProfile);
// router.put("/read-noti", protectRoute, markNotificationRead);
// router.put("/change-password", protectRoute, changeUserPassword);
// //   FOR ADMIN ONLY - ADMIN ROUTES
// router
//   .route("/:id")
//   .put(protectRoute, isAdminRoute, activateUserProfile)
//   .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;
