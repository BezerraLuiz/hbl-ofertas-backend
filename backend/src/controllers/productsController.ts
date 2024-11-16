import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../services/productsService";
import { bodySchema } from "../schemas/productsSchema";
import { getProductBySku } from "../services/productsService";
import { productInterface } from "../interfaces/productInterface";

export async function getAllProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    return reply.status(200).send(
      products.map(({ id, sku, nome, valor, descricao, imagePath }: productInterface) => ({
        id,
        sku,
        nome,
        valor,
        descricao,
        imagePath
      }))
    );
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao buscar os produtos!" });
  }
}

export async function getProductBySkuHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    const { sku } = request.query as {sku: string};

    const product = await getProductBySku(sku);
    if (!product) {
      return reply.status(404).send({ message: "Produto não encontrado!" });
    }

    return reply.status(200).send(product);
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao procurar produto!" });
  }
}

export async function deleteProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return reply
        .status(404)
        .send({ message: "Não há produtos cadastrados!" });
    }

    let { id } = request.query;
    id = parseInt(id)

    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      return reply.status(404).send({ message: "Produto não encontrado!" });
    }

    return reply.status(200).send(deletedProduct);
  } catch (e) {
    console.log(e);
    return reply.status(500).send({ message: "Erro ao procurar produto!" });
  }
}

export async function updateProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    let { id } = request.query;
    id = parseInt(id)
    const { sku, nome, valor, descricao } = bodySchema.parse(request.body);

    const updatedProduct = await updateProduct({
      id,
      sku,
      nome,
      valor,
      descricao,
    });

    return reply.status(200).send(updatedProduct);
  } catch (e) {
    console.log(e);
    return reply
      .status(500)
      .send({ message: "Não foi possível atualizar o produto!" });
  }
}

export async function createProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    let sku, nome, valor, descricao;
    const imagePath = request.query.imagePath;

    if (request.isMultipart()) {
      let i = 0;
      for await (const part of request.parts()) {
        if (part) {
          switch (part.fieldname) {
            case "nome":
              nome = part.value;
              break;
            case "sku":
              sku = part.value;
              break;
            case "valor":
              valor = Number(part.value);
              break;
            case "descricao":
              descricao = part.value;
              break;
            default:
              break;
          }
        }

        i += 1;
        if (i == 5) {
          break;
        }
      }
    }

    if (!nome || !sku || valor === undefined || !descricao) {
      throw new Error("Todos os campos são obrigatórios!");
    }

    await createProduct({ sku, nome, valor, descricao, imagePath });

    return reply.status(201).send({ message: "Produto criado com sucesso!" });
  } catch (e) {
    console.error("Erro ao criar produto:", e);
    return reply
      .status(500)
      .send({ message: "Não foi possível criar o produto! " + e });
  }
}