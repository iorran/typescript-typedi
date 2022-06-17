import { OrderEvent } from "./OrderEvent";
import { OrderItem } from "./OrderItem";
import { Product } from "./Product";
export class Order {
  orderItems: OrderItem[];
  subtotal: number;
  total: number;

  constructor(items: string[], products: Product[]) {
    this.orderItems = this.createOrderItems(items, products);
    this.subtotal = this.calculateSubtotal(this.orderItems);
    this.total = this.subtotal;

    OrderEvent.getInstance().createOrder(this);
  }

  private createOrderItems(items: string[], products: Product[]): OrderItem[] {
    return items.reduce((acumulador, item) => {
      const product = products.find((product) => product.name === item);
      const index = acumulador.findIndex(
        (orderItem) => orderItem.product.name === item
      );
      if (index !== -1) {
        acumulador[index].quantity++;
        return acumulador;
      }
      return [...acumulador, new OrderItem({ product, quantity: 1 })];
    }, []);
  }

  private calculateSubtotal(orderItems: OrderItem[]) {
    return orderItems.reduce(
      (accumulator, orderItem) =>
        accumulator + orderItem.product.price * orderItem.quantity,
      0
    );
  }
}
