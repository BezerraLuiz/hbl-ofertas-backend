import { productInterface } from "../../interfaces/productInterface";

export type createProductRequestDto = Omit<productInterface, 'id' | 'createdAt'>;