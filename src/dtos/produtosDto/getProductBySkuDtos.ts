import { productInterface } from "../../interfaces/productInterface.js";

export type GetProductBySkuRequestDto = productInterface["sku"];

export type GetProductBySkuResponseDto = productInterface[];