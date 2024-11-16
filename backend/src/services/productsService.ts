import { prisma } from "../lib/prisma";
import { GetAllProductsResponseDtos } from "../dtos/produtosDto/getAllProductsDtos";
import {
  GetProductBySkuRequestDto,
  GetProductBySkuResponseDto,
} from "../dtos/produtosDto/getProductBySkuDtos";
import { DeleteProductRequestDto } from "../dtos/produtosDto/deleteProductDtos";
import { updateProductRequestDto } from "../dtos/produtosDto/updateProductDtos";
import { createProductRequestDto } from "../dtos/produtosDto/createProductDtos";

export async function getAllProducts(): Promise<GetAllProductsResponseDtos> {
  return prisma.produtos.findMany({ orderBy: { nome: "asc" } });
}

export async function getProductBySku(
  sku: GetProductBySkuRequestDto
): Promise<GetProductBySkuResponseDto> {
  return prisma.produtos.findMany({ where: { sku } });
}

export async function deleteProduct(id: DeleteProductRequestDto) {
  return prisma.produtos.delete({ where: { id } });
}

export async function updateProduct({
  id,
  nome,
  valor,
  descricao,
  sku,
}: updateProductRequestDto) {
  return prisma.produtos.update({
    where: { id },
    data: { sku, nome, valor, descricao },
  });
}

export async function createProduct({
  sku,
  nome,
  valor,
  descricao,
  imagePath,
}: createProductRequestDto) {
  return prisma.produtos.create({
    data: {
      sku,
      nome,
      valor,
      descricao,
      imagePath,
    },
  });
}
