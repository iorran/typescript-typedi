import { Product } from "./Product";

export class OrderItem {
  product: Product;
  quantity: number;

  constructor(orderItem: OrderItem) {
    Object.assign(this, orderItem);
  }
}
