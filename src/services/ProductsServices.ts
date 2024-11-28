import { prisma } from "../lib/Prisma";

// Routes:
/**
 * Get all products ✔️
 * Get product by sku ✔️
 * Delete Product ✔️
 * Create Product
 * Update Product
 */

export async function quantityProducts(): Promise<number> {
  return prisma.products.count();
}

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
      description: product.description,
    };
  });
}

export async function getProductBySku(sku: string): Promise<object> {
  return prisma.products.findUniqueOrThrow({ where: { sku } });
}

export async function deleteProduct(sku: string): Promise<object> {
  return prisma.products.delete({ where: { sku } });
}

export async function createProduct(sku: string, name: string, price: number, description: string, imagePath: string) {
  return prisma.products.create({
    data: {
      sku,
      name,
      price,
      description,
      imagePath
    }
  });
}