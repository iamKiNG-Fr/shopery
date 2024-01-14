const express = require("express");
const router = express.Router();

const {
  getOrders,
  getMyOrders,
  getOneUserOrders,
  getMyRecentOrder,
  getMyOrderDetails,
  getUserOrderDetail,
} = require("../controllers/orders.js");

//get all Orders
router.get("", getOrders);

//get my Orders
router.get("/me", getMyOrders);

//get all Orders
router.get("/me/recent", getMyRecentOrder);
//get my order detail
router.get("/me/:orderId", getMyOrderDetails);

//get one users Orders
router.get("/:uuid", getOneUserOrders);

//get user order detail
router.get("/:orderId", getUserOrderDetail);

module.exports = router;
