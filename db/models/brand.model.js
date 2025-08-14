import mongoose, { model, Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    logo: {
      path: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    suCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    customId: String,
  },
  {
    timestamps: true,
  }
);

const brandModel = mongoose.models.Brand || model("Brand", brandSchema);

export default brandModel;
