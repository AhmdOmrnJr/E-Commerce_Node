import { model, Schema } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    slug: {
      type: String,
      required: true,
    },
    customId: String,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const subCategoryModel =
  model.SubCategory || model("SubCategory", subCategorySchema);

export default subCategoryModel;
