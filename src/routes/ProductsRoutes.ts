import { createProductHandler, deleteProductHandler, getAllProductsHandler, getProductBySkuHandler, UpdateProductHandler } from "../controllers/ProductsController";
import { server } from "../Server";

export async function productsRoutes() {
  server.get("/products", getAllProductsHandler);
  server.get("/products/sku", getProductBySkuHandler);
  server.delete("/products/delete/sku", deleteProductHandler);
  server.post("/products", createProductHandler);
  server.put("/products/update", UpdateProductHandler);
}