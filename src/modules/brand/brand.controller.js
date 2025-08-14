import { nanoid } from "nanoid";
import brandModel from "../../../db/models/brand.model.js";
import subCategoryModel from "../../../db/models/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const createBrand = async (req, res, next) => {
  const { name } = req.body;
  const { subCategoryId } = req.params;

  const subCategory = await subCategoryModel.findById(subCategoryId);
  if (!subCategory) {
    return next(new Error("subCateegory not found", { cause: 404 }));
  }
  if (await brandModel.findOne({ name, subCategoryId })) {
    return next(new Error("document duplicated", { cause: 400 }));
  }

  const customId = nanoid(5);

  if (!req.file) {
    return res
      .status(400)
      .json({ Message: "Failed", Error: "No file uploaded" });
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.PROJECT_FOLDER}/Categories/SubCategories/${subCategory.customId}/Brands/${customId}`,
    }
  );

  const brand = await brandModel.create({
    name,
    subCategoryId,
    logo: {
      path: secure_url,
      public_id,
    },
    customId,
  });

  return res.status(201).json({ messsage: "Brand created", Brand: brand });
};
