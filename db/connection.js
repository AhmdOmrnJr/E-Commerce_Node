import mongoose from "mongoose";

export const connectionDb = async () => {
  return await mongoose
    .connect(process.env.DB_URL_LOCAL)
    .then(() => {
      console.log("DB Connection Success");
    })
    .catch(() => {
      console.log("DB Connection Fail");
    });
};
