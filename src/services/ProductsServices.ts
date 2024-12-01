import { prisma } from "../lib/Prisma";
import { Decimal } from 'decimal.js';

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
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      description: product.description,
      createdAt: product.createdAt
    };
  });
}

export async function getProductBySku(sku: string): Promise<object> {
  return prisma.products.findUniqueOrThrow({ where: { sku } });
}

export async function deleteProduct(sku: string): Promise<object> {
  return prisma.products.delete({ where: { sku } });
}

export async function createProduct(sku: string, name: string, price: Decimal, description: string, imagePath: string) {
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

export async function updateProduct(id: string ,sku: string, name: string, price: Decimal, description: string): Promise<object> {
  return prisma.products.update({ 
    where: {id}, 
    data: {
      sku,
      name,
      price,
      description
    } 
  });
}