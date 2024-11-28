import { uploadImageHandler } from "../controllers/ImagesController";
import { server } from "../Server";

export async function imagesRoutes() {
  server.post("/uploads", uploadImageHandler);
}