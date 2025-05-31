import { connectionDb } from "../../db/connection.js";
import * as routers from '../index.routes.js'
import { globalResponse} from "./errorHandling.js";

export const initiateApp = (app, express) => {
  const port = process.env.PORT || 3000;
  const baseUrl = process.env.BASE_URL;

  connectionDb();

  app.use(express.json());
  
  app.use(`${baseUrl}/brand`, routers.brandRouter)
  app.use(`${baseUrl}/category`, routers.categoryRouter)
  app.use(`${baseUrl}/subCategory`, routers.subCategoryRouter)
  

  app.use((req, res) => {
    res.status(404).json({ Message: "Not-Found" });
  });

  app.use(globalResponse)

  app.listen(port, () => {
    console.log(
      `---------------- Listening on Port ${port} ------------------`
    );
  });
};
