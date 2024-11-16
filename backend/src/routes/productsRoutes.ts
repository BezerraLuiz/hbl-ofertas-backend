import {FastifyInstance} from "fastify";
import {
    getAllProductsHandler,
    getProductBySkuHandler,
    deleteProductHandler,
    updateProductHandler,
    createProductHandler,
} from "../controllers/productsController";

export async function productsRoutes(server: FastifyInstance) {
    server.get("/products", getAllProductsHandler);
    server.get("/products/searchadmin", getProductBySkuHandler);
    server.delete("/products/delete", deleteProductHandler)
    server.put("/products/update", updateProductHandler)
    server.post("/products/create", createProductHandler)
}