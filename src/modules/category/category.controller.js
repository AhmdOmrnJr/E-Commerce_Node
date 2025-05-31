import cloudinary from "../../utils/cloudinary.js";
import { nanoid } from "nanoid";
import categoryModel from "../../../db/models/category.model.js";
import slugify from "slugify";

export const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const categoryCheck = await categoryModel.findOne({ name });
  if (categoryCheck) {
    return next(new Error("Category already exists", { cause: 409 }));
  }
  if (!req.file) {
    return next(
      new Error("Please upload Picture for the the Category", { cause: 400 })
    );
  }

  const customId = nanoid(5);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.PROJECT_FOLDER}/Categories/${customId}`,
    }
  );

  const category = await categoryModel.create({
    name,
    image: {
      path: secure_url,
      public_id,
    },
    slug: slugify(name, "-"),
    customId,
  });

  if (category) {
    return res
      .status(201)
      .json({ message: `Category ${name} Created Successfuly`, category });
  }

  await cloudinary.uploader.destroy(public_id);
  return next(new Error("Failed to add Category", { cause: 500 }));
};

export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryModel.findById(categoryId);
  if (req.body.name) {
    if (category.name == req.body.name) {
      return next(
        new Error(`Please enter a different Category name`, { cause: 400 })
      );
    }
    if (await categoryModel.findOne({ name: req.body.name })) {
      return next(
        new Error(
          `Please enter a different Category name than ${req.body.name} as it already exists`,
          { cause: 400 }
        )
      );
    }
    category.name = req.body.name;
    category.slug = slugify(req.body.name, "-");
  }

  if (req.file) {
    if (!category.image.public_id) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: `${process.env.PROJECT_FOLDER}/Categories/${category.customId}`,
        }
      );
      category.image = {
        path: secure_url,
        public_id,
      };
    }
    await cloudinary.uploader.destroy(category.image.public_id);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.PROJECT_FOLDER}/Categories/${category.customId}`,
      }
    );
    category.image = {
      path: secure_url,
      public_id,
    };
  }

  const updatedCategory = await category.save();
  return res
    .status(200)
    .json({ message: "Category updated successfully", updatedCategory });
};

export const getAllCategories = async (req, res, next) => {
  const categories = await categoryModel.find({}).populate([{
    path: 'SubCategories'
  }]);
  if (categories.length) {
    return res.status(200).json({ message: "Done", categories });
  }
  return res.status(200).json({ message: "No Categories Found" });
};

