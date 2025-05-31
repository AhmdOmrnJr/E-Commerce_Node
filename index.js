import { config } from "dotenv";
import express from "express";
import { initiateApp } from "./src/utils/initiateApp.js";

config({ path: "./config/dev.env" });
const app = express();
initiateApp(app, express);