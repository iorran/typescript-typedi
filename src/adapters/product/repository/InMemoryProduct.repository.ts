import { Service } from "typedi";
import { Product } from "../../../core/entity/Product";
import { IProductRepository } from "../../../core/usecase/product/ports/IProductRepository";

const products: Product[] = [
  { name: "Soup", price: 0.65 },
  { name: "Bread", price: 0.8 },
  { name: "Milk", price: 1.3 },
  { name: "Apples", price: 1.0 },
];

@Service()
export class InMemoryProductRepository implements IProductRepository {
  findAllByNameInAndWithStock(names: string[]): Product[] {
    return products.filter((product) => names.includes(product.name));
  }
}
