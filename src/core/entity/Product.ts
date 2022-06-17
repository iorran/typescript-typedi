export class Product {
  name: string;
  price: number;

  constructor(product: Product) {
    Object.assign(this, product);
  }
}
