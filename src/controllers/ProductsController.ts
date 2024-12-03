import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductBySku,
  quantityProducts,
  updateProduct,
} from "../services/ProductsServices";
import {
  bodySchemaCreateProducts,
  bodySchemaUpdateProducts,
  querySchameUpdateProducts,
  querySchemaProducts,
} from "../schemas/ProductsSchemas";
import Decimal from "decimal.js";

// Routes:
/**
 * Get all products ✔️
 * Get product by sku ✔️
 * Delete Product ✔️
 * Create Product ✔️
 * Update Product ...
 */

export async function getAllProductsHandler(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const quantity = await quantityProducts();

    if (!quantity)
      return reply
        .status(404)
        .send({ error: true, message: "No products registered!" });

    return getAllProducts();
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}

export async function getProductBySkuHandler(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const quantity = await quantityProducts();

    if (!quantity)
      return reply
        .status(404)
        .send({ error: true, message: "No products registered!" });

    const { sku } = querySchemaProducts.parse(req.query) as { sku: string };

    const product = await getProductBySku(sku);

    if (!product)
      reply.status(404).send({ error: true, message: "Product not found!" });

    return reply.status(200).send({ error: false, product });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}

export async function deleteProductHandler(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const { sku } = querySchemaProducts.parse(req.query) as { sku: string };

    return deleteProduct(sku);
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}

export async function createProductHandler(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const { sku, name, price, description, imageId } =
    bodySchemaCreateProducts.parse(req.body) as {
        sku: string;
        name: string;
        price: Decimal;
        description: string;
        imageId: string;
      };

    const product = await createProduct(
      sku,
      name,
      price,
      description,
      imageId
    );

    if (!product)
      return reply
        .status(400)
        .send({ error: true, message: "Error creating the product!" });

    return reply.status(201).send({ error: false, product });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}

export async function UpdateProductHandler(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<object> {
  try {
    const { sku, name, price, description } = bodySchemaUpdateProducts.parse(
      req.body
    ) as {
      sku: string;
      name: string;
      price: Decimal;
      description: string;
    };

    const { id } = querySchameUpdateProducts.parse(req.query);

    const product = await updateProduct(id, sku, name, price, description);

    if (!product)
      return reply
        .status(400)
        .send({ error: true, message: "Error creating the product!" });

    return reply.status(200).send({ error: false, product });
  } catch (e) {
    return reply
      .status(505)
      .send({ error: true, message: "Internal Error: " + e });
  }
}
