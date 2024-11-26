import { prisma } from "../lib/Prisma";

// Routes:
/**
 * Get all products ✔️
 * Get product by sku
 * Delete Product
 * Create Product
 * Update Product
 */

export async function getAllProducts(): Promise<object> {
  const products = await prisma.products.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return products.map((product) => {
    return {
      sku: product.sku,
      name: product.name,
      price: product.price,
      description: product.description
    }
  })
}

export async function getProductBySku(sku: string): Promise<object> {
  return await prisma.products.findUniqueOrThrow({ where: { sku } });
}
