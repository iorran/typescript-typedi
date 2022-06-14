import { v4 as uuidv4 } from 'uuid';

export class Product {
  readonly id: string;
  name: string;
  price: number;

  constructor(product: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, product);

    if (!id) {
      this.id = uuidv4();
    }
  }
}
