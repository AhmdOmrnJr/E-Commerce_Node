import moment from "moment";
import couponModel from "../../../db/models/coupon.model.js";

export const createCoupon = async (req, res, next) => {
  const { code, amount, fromDate, toDate } = req.body;
  const isExist = await couponModel.findOne({ code });
  if (isExist) {
    return next(
      new Error("Please enter different coupon code", { cause: 400 })
    );
  }

  const fromDateMoment = moment(new Date(fromDate)).format("YYYY-MM-DD HH:MM");
  const toDateMoment = moment(new Date(toDate)).format("YYYY-MM-DD HH:MM");
  const nowDate = moment().format("YYYY-MM-DD HH:MM");

  if (moment(nowDate).isAfter(moment(fromDateMoment)) || moment(nowDate).isAfter(moment(toDateMoment))) {
    return next(
      new Error("Please enter FUTURISTIC DATES", { cause: 400 })
    );
  }

  const coupon = await couponModel.create({
    code,
    fromDate: fromDateMoment,
    toDate: toDateMoment,
    amount
  })

  return res.status(201).json({message: 'Coupon Created', Coupon: coupon})
};
