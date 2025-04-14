import jsonwebtoken from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization; // No split

    console.log("Token received in headers:", token);
  
    if (!token) return res.status(401).json({ message: "No token, auth denied" });
    const tokenValue = token.split(' ')[1];  // Remove 'Bearer ' prefix
    try {
        console.log("token;", token)
      const decoded = jsonwebtoken.verify(tokenValue, process.env.JWT_SECRET); // same secret as used in login
      console.log("Decoded token:", decoded.user); // Debugging log
      req.user = decoded; // token mein user ka id hoga
      console.log("User ID from token:", req.user); // Debugging log
      // Now you can access req.user in your routes
      next();
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };