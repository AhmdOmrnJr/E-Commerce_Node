import cloudinary from "../../utils/cloudinary.js";
import { nanoid } from "nanoid";
import categoryModel from "../../../db/models/category.model.js";
import subCategoryModel from "../../../db/models/subCategory.model.js";
import slugify from "slugify";

export const createSubCategory = async (req, res, next) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  const CategoryCheck = await categoryModel.findById(categoryId);
  if (!CategoryCheck) {
    return next(new Error("Category does not exists", { cause: 404 }));
  }

  const subCategoryCheck = await subCategoryModel.findOne({ name });
  if (subCategoryCheck) {
    return next(new Error("SubCategory already exists", { cause: 409 }));
  }
  if (!req.file) {
    return next(
      new Error("Please upload Picture for the SubCategory", { cause: 400 })
    );
  }

  const customId = nanoid(5);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.PROJECT_FOLDER}/Categories/SubCategories/${customId}`,
    }
  );

  const subCategory = await subCategoryModel.create({
    name,
    image: {
      path: secure_url,
      public_id,
    },
    slug: slugify(name, "-"),
    customId,
    categoryId,
  });

  if (subCategory) {
    return res.status(201).json({
      message: `subCategory ${name} Created Successfuly`,
      subCategory,
    });
  }

  await cloudinary.uploader.destroy(public_id);
  return next(
    new Error(`Failed to add subCategory ${subCategory}`, { cause: 500 })
  );
};

export const updateSubCategory = async (req, res, next) => {
  const { /*categoryId,*/ subCategoryId } = req.params;
  // const Category = await categoryModel.findById(categoryId);
  const subCategory = await subCategoryModel.findById(subCategoryId);
  if (req.body.name) {
    if (subCategory.name == req.body.name) {
      return next(
        new Error(`Please enter a different SubCategory name`, { cause: 400 })
      );
    }
    if (await subCategoryModel.findOne({ name: req.body.name })) {
      return next(
        new Error(
          `Please enter a different subCategory name than ${req.body.name} as it already exists`,
          { cause: 400 }
        )
      );
    }
    subCategory.name = req.body.name;
    subCategory.slug = slugify(req.body.name, "-");
  }

  if (req.file) {
    if (!subCategory.image.public_id) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: `${process.env.PROJECT_FOLDER}/Categories/SubCategories/${customId}`,
        }
      );
      subCategory.image = {
        path: secure_url,
        public_id,
      };
    }
    await cloudinary.uploader.destroy(subCategory.image.public_id);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.PROJECT_FOLDER}/Categories/${subCategory.customId}`,
      }
    );
    subCategory.image = {
      path: secure_url,
      public_id,
    };
  }

  const updatedSubCategory = await subCategory.save();
  return res
    .status(200)
    .json({ message: "SubCategory updated successfully", updatedSubCategory });
};
