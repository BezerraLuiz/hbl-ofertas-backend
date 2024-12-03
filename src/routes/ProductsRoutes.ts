import { createProductHandler, deleteProductHandler, getAllProductsHandler, getProductBySkuHandler, UpdateProductHandler } from "../controllers/ProductsController";
import { server } from "../Server";

export async function productsRoutes() {
  server.get("/products/all", getAllProductsHandler);
  server.get("/products", getProductBySkuHandler);
  server.delete("/products/delete", deleteProductHandler);
  server.post("/products", createProductHandler);
  server.put("/products/update", UpdateProductHandler);
}