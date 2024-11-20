import { productInterface } from "../../interfaces/productInterface.js";

export type createProductRequestDto = Omit<productInterface, 'id' | 'createdAt'>;