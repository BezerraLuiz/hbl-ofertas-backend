import { deleteImage, uploadImage } from "../controllers/ImagesController";
import { server } from "../Server";

export async function imagesRoutes() {
  server.post("/uploads", uploadImage);
  server.delete("/uploads", deleteImage);
}