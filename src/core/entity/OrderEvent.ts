import { Order } from "./Order";

export class OrderEvent {
  private static instance: OrderEvent;
  private messages: string[];

  private constructor() {
    this.messages = [];
  }

  public static getInstance(): OrderEvent {
    if (!OrderEvent.instance) {
      OrderEvent.instance = new OrderEvent();
    }

    return OrderEvent.instance;
  }

  public createOrder(order: Order) {
    this.messages.push(`Subtotal: £${order.subtotal.toFixed(2)}`);
  }

  public addDiscount(productName: string, discount: number, value: number) {
    this.messages.push(
      `${productName} ${discount * 100}% off: -${value * 100}p`
    );
  }

  closeOrder(order: Order) {
    if (order.total === order.subtotal) {
      this.messages.push("(no offers available)");
    }
    this.messages.push(`Total: £${order.total.toFixed(2)}`);
  }

  public print() {
    console.log(this.messages.join("\n"));
    this.messages = [];
  }
}
