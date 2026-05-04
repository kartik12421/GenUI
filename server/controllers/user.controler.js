import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Current user server error: ${error.message}` });
  }
};
