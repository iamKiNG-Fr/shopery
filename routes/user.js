const express = require("express");
const router = express.Router();
const {
  getUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
  addUserAddress,
  getUsersAddresses,
  getUserAddress,
  updateUserAddress,
} = require("../controllers/users");
const { ensureAuthenticated } = require("../controllers/authControllers");
//passport
const initializePassport = require("../passportConfig");
const passport = require("passport");
initializePassport(passport);

//get all users
router.get("", getUsers);

router.get("/profile", (req, res) => {
    const {uuid, email} = req.user
  if(!req.user){
    return res.status(404).json({message:"no user logged in"})
  }
  return res.status(200).json({uuid, email});
});

//get all user addresses
router.get("/address", getUsersAddresses);

//get single user
router.get("/:uuid", ensureAuthenticated, getOneUser);

//add user
router.post("", addUser);

//update user
router.put("/edit/:uuid", updateUser);

//delete user
router.delete("/:uuid", deleteUser);


//get a user address
router.get("/address/:uuid", getUserAddress);

//add user address
router.post("/address/:uuid", addUserAddress);

//update user address
router.put("/address/:uuid", updateUserAddress);



module.exports = router;
