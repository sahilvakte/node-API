const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  //This process encrypt the password submitted and if any error occured it will return the error
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }

    // Registration for New User
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "User Added Successfully !",
        });
      })
      .catch((error) => {
        console.log("Error",error)
        res.json({
          message: "An Error Occured !!!",
        });
      });
  });
};

//Login

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  // Search in database that User is exist or Not
  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      // If User exist it compare id and password
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }

          // if comapre match login success and creates a token
          if (result) {
            let token = jwt.sign({ _id: user._id }, "AzQ,PI)0(", {
              expiresIn: "1h",
            }); //{expiresIn:'1h'} time for login
            res.json({
              message: "Login Successful !",
              token,
            });
          } else {
            res.json({
              message: "Password does not matched !",
            });
          }
        });
      }

      // If User does not Found
      else {
        res.json({
          message: "No User found !",
        });
      }
    }
  );
};

// Update Password

const updatepass = async (req, res, next) => {
  try {
    let updateData = {
      password: req.body.password,
    };

    await User.findOneAndUpdate(
      { email: req.body.username },
      { $set: updateData }
    ).exec((err, result) => {
      if (err) {
        return res.json({
          message: "An Error Occured",
        });
      }
      if (result) {
        res.json({
          message: "Password Updated Successfully",
        });
      } else {
        return res.json({
          message: "User Not found",
        });
      }
    });
  } catch (err) {
    console.log("err at try-catch block", err);
    return res.json({
      message: "An Error Occured",
    });
  }

  //   var username = req.body.username;
  //   //   var password = req.body.password;

  //   User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
  //     (user) => {
  //     //  const update = (req, res, next) => {
  //         let updateData = {
  //           password : req.body.password,
  //         };
  //         User.findOneAndUpdate({email:username}, { $set: updateData })
  //           .then((response) => {
  //             res.json({
  //               message: "Password Updated Successfully",
  //             });
  //           })
  //           .catch((error) => {
  //             console.log("Error",error)
  //             res.json({
  //               message: "An Error Occured",
  //             });
  //           });
  //     //    };
  //     }
  //   );
};

module.exports = {
  register,
  login,
  updatepass,
};
