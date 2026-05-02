import jwt from "jsonwebtoken";

export const genToken = async (userId) => {
  try {
    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
