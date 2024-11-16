import { productInterface } from "../../interfaces/productInterface";

export type updateProductRequestDto = Omit<productInterface, 'createdAt' | 'imagePath'>;
