import mongoose, { model, Schema } from "mongoose";

const categorySchema = new Schema(
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
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

categorySchema.virtual("SubCategories", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "categoryId",
  // justOne: true
});

const categoryModel = mongoose.models.Category || model("Category", categorySchema);

export default categoryModel;
