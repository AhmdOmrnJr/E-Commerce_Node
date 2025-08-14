import mongoose, { model, Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    amount: {
      type: Number,
      default: 1,
      required: true,
    },
    couponStatus: {
      type: String,
      default: "valid",
      enum: ["valid", "expired"],
    },
    fromDate: {
      type: String,
      required: [true, 'Plase enter fromDate field'],
    },
    toDate: {
      type: String,
      required: [true, 'Plase enter toDate field'],
    },
  },
  {
    timestamps: true,
  }
);

const couponModel = mongoose.models.Coupon || model("Coupon", couponSchema);
export default couponModel;
