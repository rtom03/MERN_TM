import Notification from "../models/notification.js";
import User from "../models/user.js";
import { createJwt } from "../utils/db.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(401).json({ message: "User already exist" });
    }
    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      role,
      title,
    });
    if (user) {
      isAdmin ? createJwt(req, user._id) : null;
      user.password = undefined;
      res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user?.isActive) {
      return res.status(401).json({
        message: "User account has been deactivated, contact the administrator",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJwt(res, user._id);
      user.password = undefined;
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const getTeamList = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const getNotification = async (req, res) => {
  try {
    const { userId } = req.user;
    const notifications = await Notification.findOne({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");
    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;
    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);
    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;

      const updatedUser = await User.save();

      user.password = undefined;
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(404).josn({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { userId } = req.user;
    const { isReadType, id } = req.query;
    if (isReadType === "all") {
      await Notification.updateMany(
        {
          team: userId,
          isRead: { $nin: [userId] },
        },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notification.findOneAndUpdate(
        {
          _id: id,
          isRead: { $nin: [userId] },
        },
        { $push: { isRead: userId } },
        { new: true }
      );
      res.status(200).json({ message: "Done" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (user) {
      user.password = req.body.password;
      await user.save;

      res.status(200).json({
        message: "Password changed successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const activateUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (user && user.isAdmin) {
      user.isActive = req.body.isActive;

      await user.save();

      user.password = undefined;

      res.status(200).json({
        message: `User account has been ${
          user?.isActive ? "activated" : "deactivated"
        }`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

// export const deleteUserProfile = async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// };export const deleteUserProfile = async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// };
