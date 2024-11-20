import { productInterface } from "../../interfaces/productInterface.js";

export type updateProductRequestDto = Omit<productInterface, 'createdAt' | 'imagePath'>;
