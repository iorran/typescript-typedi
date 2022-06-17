import { NoProductsProvidedError } from "../errors/NoProductsProvided.error";

export class CreateOrderValidator {
  static validate(products: string) {
    if (!products.length) {
      throw new NoProductsProvidedError();
    }

    const items = products.trim().split(" ");

    return items;
  }
}
