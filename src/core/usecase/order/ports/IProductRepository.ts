import { Product } from '../../../entity/Product';

export interface IProductRepository {
  create(product: Product): Product;
  findById(id: string): Product | undefined;
  list(): Product[];
}
