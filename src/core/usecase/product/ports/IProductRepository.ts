import { Product } from "../../../entity/Product";

export interface IProductRepository {
  findAllByNameInAndWithStock(name: string[]): Product[];
}
