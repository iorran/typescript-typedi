export class NoProductsInStock extends Error {
  constructor() {
    super("No products in stock");
  }
}
