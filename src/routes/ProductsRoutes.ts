import { getAllProductsHandler, getProductBySkuHandler } from "../controllers/ProductsController";
import { server } from "../Server";

export async function productsRoutes() {
  server.get("/products", getAllProductsHandler);
  server.get("/products:sku", getProductBySkuHandler);
  server.delete("/products/delete:sku", getProductBySkuHandler);
}