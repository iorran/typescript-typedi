import { Product } from "../../../core/entity/Product";

export interface IFindAvailableProductsService {
  execute(products: string[]): Product[];
}
