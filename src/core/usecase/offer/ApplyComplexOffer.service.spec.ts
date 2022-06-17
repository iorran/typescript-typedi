import { Offer } from "../../entity/Offer";
import { Order } from "../../entity/Order";
import { Product } from "../../entity/Product";
import { ApplyComplexOffer } from "./ApplyComplexOffer.service";

describe("ApplyComplexOffer", () => {
  it("should apply complex offer when we have the minimum quantity", () => {
    const applyComplexOffer = new ApplyComplexOffer();

    const items: string[] = ["Arroz", "Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [
      {
        discount: 1,
        productName: "Arroz",
        affectedProductName: "Feijao",
        quantity: 2,
      },
    ];

    const discount = applyComplexOffer.execute(order, offers);

    expect(discount).toBe(20);
  });

  it("should not apply complex offer when there is no affected product in an order", () => {
    const applyComplexOffer = new ApplyComplexOffer();

    const items: string[] = ["Arroz", "Arroz", "Mostarda"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Mostarda", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [
      {
        discount: 1,
        productName: "Arroz",
        affectedProductName: "Feijao",
        quantity: 2,
      },
    ];

    const discount = applyComplexOffer.execute(order, offers);

    expect(discount).toBe(0);
  });

  it("should not apply complex discount if we have more affectedItems them the minimum item in promotion", () => {
    const applyComplexOffer = new ApplyComplexOffer();

    const items: string[] = ["Arroz", "Arroz", "Mostarda", "Mostarda"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Mostarda", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [
      {
        discount: 1,
        productName: "Arroz",
        affectedProductName: "Mostarda",
        quantity: 2,
      },
    ];

    const discount = applyComplexOffer.execute(order, offers);

    expect(discount).toBe(20);
  });

  it("should apply complex more then one time if applicable", () => {
    const applyComplexOffer = new ApplyComplexOffer();

    const items: string[] = [
      "Arroz",
      "Arroz",
      "Arroz",
      "Arroz",
      "Mostarda",
      "Mostarda",
    ];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Mostarda", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [
      {
        discount: 1,
        productName: "Arroz",
        affectedProductName: "Mostarda",
        quantity: 2,
      },
    ];

    const discount = applyComplexOffer.execute(order, offers);

    expect(discount).toBe(40);
  });
});
