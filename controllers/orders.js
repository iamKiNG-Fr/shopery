const {
  Products,
  ShoperyOrders,
  OrderStatus,
  ShippingAddress,
  Users,
  ShoperyOrderDetails,
} = require("../sequelize/models");
const orderstatus = require("../sequelize/models/orderstatus");
const shoperyorders = require("../sequelize/models/shoperyorders");

const getOrders = async (req, res) => {
  const shoperyOrders = await ShoperyOrders.findAll({
    include: [
      { model: Users, attributes: ["email"] },
      { model: OrderStatus, attributes: ["status"] },
    ],
  });
  if(shoperyOrders.length === 0){
    return res.status(404).json({message:"No Orders Found"})
  }
  return res.status(200).json(shoperyOrders);
};

const getMyOrders = async (req, res) => {
  const { uuid } = req.user;
  const user = await Users.findOne({ where: { uuid } });
  const myShoperyOrders = await ShoperyOrders.findAll({
    where: { userId: user.id },
    attributes: { exclude: ["userId", 'shippingAddressId', 'statusId'] },
    include: [
      { model: Users, attributes: ["email"] },
      { model: OrderStatus, attributes: ["status"] },
    ],
  });
  if(myShoperyOrders.length === 0){
    return res.status(404).json({message:"You have no Orders"})
  }
  return res.status(200).json(myShoperyOrders);
};

const getMyRecentOrder = async (req, res) => {
  const { uuid } = req.user;
  const user = await Users.findOne({ where: { uuid } });
  const myShoperyOrders = await ShoperyOrders.findAll({
    where: { userId: user.id },
    attributes: { exclude: ["userId"] },
    include: [
      { model: Users, attributes: ["email"] },
      { model: OrderStatus, attributes: ["status"] },
    ],
  });
  if(myShoperyOrders.length === 0){
    return res.status(404).json({message:"You have no Orders"})
  }
  const lastOrder = myShoperyOrders[myShoperyOrders.length - 1];
  return res.status(200).json(lastOrder);
};

const getOneUserOrders = async (req, res) => {
  const { uuid } = req.params;
  const user = await Users.findOne({ where: { uuid } });
  const shoperyOrders = await ShoperyOrders.findAll({
    where: { userId: user.id },
    include: [
      { model: Users, attributes: ["email"] },
      { model: OrderStatus, attributes: ["status"] },
    ],
  });
  if(shoperyOrders.length === 0){
    return res.status(404).json({message:"This user has no Orders"})
  }
  return res.status(200).json(shoperyOrders);
};

const getMyOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  const shoperyOrdersDetails = await ShoperyOrderDetails.findAll({
    where: { orderId },
    include: [
      { model: Products, attributes: ["productName"] },
      {
        model: ShoperyOrders,
        attributes: ["paymentMethod", "orderTotal"],
        include: [{ model: OrderStatus, attributes: ["status"] }, { model: ShippingAddress, attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']} }],
      },
    ],
    attributes: {exclude: ['id']}
  });
  if(shoperyOrdersDetails.length === 0){
    return res.status(404).json({message:"You have no Orders"})
  }
  return res.status(200).json(shoperyOrdersDetails);
};

const getUserOrderDetail = async (req, res) => {
  const { orderId } = req.params;
  const shoperyOrdersDetails = await ShoperyOrderDetails.findAll({
    where: { orderId },
    include: [
      { model: Products, attributes: ["productName"] },
      {
        model: ShoperyOrders,
        attributes: ["paymentMethod", "orderTotal"],
        include: [{ model: OrderStatus, attributes: ["status"] }, { model: ShippingAddress, attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']} }],
      },
    ],
  });
  if(shoperyOrdersDetails.length === 0){
    return res.status(404).json({message:"This user has no Orders"})
  }
  return res.status(200).json(shoperyOrdersDetails);
};

module.exports = {
  getOrders,
  getMyOrderDetails,
  getMyOrders,
  getOneUserOrders,
  getMyRecentOrder,
  getOneUserOrders,
  getUserOrderDetail,
};
