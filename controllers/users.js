const { Users, ShippingAddress } = require("../sequelize/models");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();

    if (users.length === 0) {
      return res.status(200).json({ message: "There are no users" });
    }
    console.log(req.session, req);
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const singleUser = await Users.findOne({ where: { uuid } });

    if (singleUser.length === 0) {
      return res.status(200).json({ message: "User does not exist" });
    }

    res.json(singleUser);
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, profile_img, password, cpassword } =
      req.body;

    const user = await Users.findAll({ where: { email: email } });
    let errors = [];

    // form validation
    if (user.length > 0) {
      console.log("user email exist");
      errors.push("user with email exist");
    }
    if (password.length < 5) {
      errors.push("password must be 5 characters or more");
    }

    if (password != cpassword) {
      errors.push("passwords do not match");
    }

    if (errors.length > 0) {
      console.log(errors);
      return res.status(400).json({ errors });
    }

    // Form validaiton passed
    else {
      let hashedPassword = await bcrypt.hash(password, 10);

      Users.create({
        firstname,
        lastname,
        email,
        profile_img,
        password: hashedPassword,
      });

      return res.status(200).json({ message: "successfully registered" });
    }
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const updateUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const user = await Users.findOne({ where: { uuid } });

    if (user) {
      await Users.update(req.body, { where: { uuid } });
      return res
        .status(200)
        .json({ message: `${user.firstname} successfully updated` });
    }
    return res.status(404).json({ message: "user does not exist" });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const user = await Users.findOne({ where: { uuid } });

    if (user) {
      await user.destroy();
      return res.json({ message: "user has been deleted!" });
    }

    return res.status(404).json({ message: "user does not exist!" });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const addUserAddress = async (req, res) => {
  try {
    const { houseNumber, streetName, addressLine, city, state } = req.body;

    const uuid = req.params.uuid;

    const user = await Users.findAll({ where: { uuid } });

    ShippingAddress.create({
      houseNumber,
      streetName,
      addressLine,
      city,
      state,
      userId: user.id,
    });

    return res
      .status(200)
      .json({ status: "success", message: "user address added" });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getUsersAddrsses = async (req, res) => {
  try {
    const addresses = await ShippingAddress.findAll();

    if (addresses.length === 0) {
      return res.status(200).json({ message: "no Addresses found" });
    }
    return res.json({ addresses });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const user = await Users.findOne({ where: { uuid } });
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const singleAddress = await ShippingAddress.findOne({
      where: { userId: user.id },
    });

    if (singleAddress.length === 0) {
      return res
        .status(404)
        .json({ message: "No address found for this user" });
    }

    return res.json(singleAddress);
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const user = await Users.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }

    const address = await ShippingAddress.findOne({
      where: { userId: user.id },
    });

    if (address) {
      await ShippingAddress.update(req.body, { where: { id: user.id } });
      return res
        .status(200)
        .json({ message: `${user.firstname} address successfully updated` });
    }
    return res.status(404).json({ message: "user has no address" });
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = {
  getUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
  addUserAddress,
  getUsersAddrsses,
  getUserAddress,
  updateUserAddress,
};
