import mongoose, { Query } from 'mongoose';
const Product = require('../models/productModel');
interface IOrder extends Document {
  orderNumber: string;
  products: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  userId: mongoose.Types.ObjectId;
  paid: boolean;
  completed: boolean;
  shipping: {
    id: string;
    name: string;
    price: Number;
    cashOnDelivery: Boolean;
  };
  address: Address;
  totalPriceWithoutShipping: String;
}
const orderModel = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    totalPriceWithoutShipping: {
      type: Number,
      required: true,
    },
    orderProducts: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: Product,
          required: [true, 'Order must have a products'],
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must have a client'],
    },

    address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      street: { type: String, required: true },
      houseNumber: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
    shipping: {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      cashOnDelivery: {
        type: Boolean,
        required: true,
      },
    },
  },

  { timestamps: true }
);
orderModel.pre(/^find/, function (next) {
  const query = this as Query<IOrder, IOrder>;
  query
    .populate({
      path: 'user',
      select: '-__v -createdAt -updatedAt',
    })
    .populate({
      path: 'orderProducts.product',
      select: '-__v -createdAt -updatedAt -description',
    });
  next();
});
const Order = mongoose.model('order', orderModel);
module.exports = Order;
