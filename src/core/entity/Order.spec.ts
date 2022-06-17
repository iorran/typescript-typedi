import { Order } from "./Order";
import { Product } from "./Product";

describe("Order", () => {
  it("should create an empty order", () => {
    const order = new Order([], []);
    expect(order.orderItems).toEqual([]);
    expect(order.subtotal).toEqual(0);
    expect(order.total).toEqual(0);
  });
  it("should create an order and calculate the total", () => {
    const items: string[] = ["Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);
    expect(order.orderItems).toEqual([
      {
        product: {
          name: "Arroz",
          price: 10,
        },
        quantity: 1,
      },
      {
        product: {
          name: "Feijao",
          price: 20,
        },
        quantity: 1,
      },
    ]);
    expect(order.subtotal).toEqual(30);
    expect(order.total).toEqual(30);
  });

  it("should create an order with 3 items and calculate the total", () => {
    const items: string[] = ["Arroz", "Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);
    expect(order.orderItems).toEqual([
      {
        product: {
          name: "Arroz",
          price: 10,
        },
        quantity: 2,
      },
      {
        product: {
          name: "Feijao",
          price: 20,
        },
        quantity: 1,
      },
    ]);
    expect(order.subtotal).toEqual(40);
    expect(order.total).toEqual(40);
  });
});
