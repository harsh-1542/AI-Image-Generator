import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization"); // Get token from headers

  // console.log(" message from auth : Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Remove 'Bearer ' from token if present
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Remove "Bearer " (7 characters)
      // console.log("Removing 'Bearer", token);
      
      // token = token.slice(7).trim(); // Remove "Bearer " (7 characters)
    }

    // console.log("Token after removing 'Bearer ':", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded values from token:", decoded);

    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    res.status(401).json({ message: "Invalid Token", error: error.message });
  }
};
