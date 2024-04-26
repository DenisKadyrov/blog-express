import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

// function for registration
export const register = async (req, res) => {
  try {
    // password hashing 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // create new user document 
    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    // save user document in mongoDB
    const user = await doc.save(); 
    
    // create token 
    const token = jwt.sign(
      {
        _id: user._id, 
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    // exclude hashed password from response body
    const { passwordHash, ...userData } = user._doc; 

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    // if get at error during execution,
    // print error in console returs 500 http status
    console.log(err);
    res.status(500).json({
      message: "Error",
    });
  }
}

// function for login
export const login = async (req, res) => {
  /**
   * try find user by email in database, if not found message "not correct data"
   * else check password and return user data if password valid
   */
  try {
    // find user
    const user = await UserModel.findOne({email: req.body.email});
 
    if (!user) {
      return res.status(400).json({
        message: "Not correct login or password",
      });
    }

    // check password
    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash); 

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Not correct login or password",
      });
    }

    // create token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    
    // exclude hashed password form data
    // return user data and token
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed to log in",
    });
  }
}

//function for get information about authorized user
export const getMe = async (req, res) => {
  try {
    // try find user by id 
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Permission denied",
      });
    }
    // send user data
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Permission denied",
    });
  }
}
