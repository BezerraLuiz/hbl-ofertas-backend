import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, deleteProduct, getAllProducts, getProductBySku, quantityProducts } from "../services/ProductsServices";
import { bodySchemaProducts, querySchemaProducts } from "../schemas/ProductsSchemas";

// Routes:
/**
 * Get all products ✔️
 * Get product by sku ✔️
 * Delete Product ✔️
 * Create Product ...
 * Update Product
 */

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

// Validações para fazer:
/**
 * Se o produto já existe.
 */
export async function createProductHandler(req: FastifyRequest, reply: FastifyReply) {
  // const { sku, name, price, description } = bodySchemaProducts.parse(req.body) as { sku: string, name: string, price: number, description: string };

  // --> Inicia upload da imagem.

  const data = await req.file();

  return console.log(data);

  // --> Termina upload da imagem.

  // const product = await createProduct(sku, name, price, description, imagePath);

  // return reply.status(201).send({ error: false, product });
}