import { Service } from "typedi";
import { NoProductsInStock } from "../../../adapters/order/errors/NoProductsInStock.error";
import { IFindAvailableProductsService } from "../../../adapters/product/ports/IFindAvailableProductsService";
import { InMemoryProductRepository } from "../../../adapters/product/repository/InMemoryProduct.repository";
import { Product } from "../../entity/Product";

@Service()
export class FindAvailableProductsService
  implements IFindAvailableProductsService
{
  constructor(protected productRepository: InMemoryProductRepository) {}

  execute(products: string[]): Product[] {
    const productsName = Array.from(new Set(products));
    const productsFound =
      this.productRepository.findAllByNameInAndWithStock(productsName);
    if (productsFound.length !== productsName.length) {
      throw new NoProductsInStock();
    }
    return productsFound;
  }
}
