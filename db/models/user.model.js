import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    userName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dateOfBirth: String,
    phone: {
      type: String,
      unique: true,
    },
    image: {
      path: {
        type: String,
        // required: true,
      },
      public_id: {
        type: String,
        // required: true,
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next, doc) {
  this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS);
  next();
});

const userModel = mongoose.models.User || model("User", userSchema);

export default userModel;
