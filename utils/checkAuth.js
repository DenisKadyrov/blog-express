/**
 * check authorization
 */
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  //get token from header
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    // if token not empty, decoded it
    try {
      const decoded = jwt.verify(token, "secret123");

      // add userId property to request body
      req.userId = decoded._id;
      next()
    } catch (err) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
  } else {
    return res.status(403).json({
      message: "Permission denied",
    });
  }
}
