import { FastifyReply, FastifyRequest } from "fastify";
import { deleteProduct, getAllProducts, getProductBySku, quantityProducts } from "../services/ProductsServices";
import { querySchemaProducts } from "../schemas/ProductsSchemas";

export async function getAllProductsHandler(req: FastifyRequest, reply: FastifyReply): Promise<object> {
  const quantity = await quantityProducts();
  
  if (!quantity) return reply.status(404).send({ error: true, message: "No products registered!"});
  
  return getAllProducts();
}

export async function getProductBySkuHandler(req: FastifyRequest, reply: FastifyReply): Promise<object> {
  const quantity = await quantityProducts();
  
  if (!quantity) return reply.status(404).send({ error: true, message: "No products registered!"});

  const { sku } = querySchemaProducts.parse(req.query) as { sku: string };

  const product = await getProductBySku(sku);

  if (!product) reply.status(404).send({ error: true, message: "Product not found!" });

  return reply.status(200).send({ error: false, product });
}

export async function deleteProductHandler(req: FastifyRequest): Promise<object> {
  const { sku } = querySchemaProducts.parse(req.query) as { sku: string };

  return deleteProduct(sku);
}

