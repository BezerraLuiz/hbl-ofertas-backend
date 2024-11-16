import {productInterface} from "../../interfaces/productInterface";

export type GetProductBySkuRequestDto = productInterface["sku"];

export type GetProductBySkuResponseDto = productInterface[];