import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "fail to get current user" });
    }

    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ mesage: `current user server error: ${error}` });
  }
};
