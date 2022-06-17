import { Offer } from "../../entity/Offer";
import { Order } from "../../entity/Order";
import { Product } from "../../entity/Product";
import { ApplySimpleOffer } from "./ApplySimpleOffer.service";

describe("ApplySimpleOffer", () => {
  it("should apply simple offer to one product", () => {
    const applySimpleOffer = new ApplySimpleOffer();

    const items: string[] = ["Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [{ discount: 0.1, productName: "Arroz" }];

    const discount = applySimpleOffer.execute(order, offers);

    expect(discount).toBe(1);
  });

  it("should apply simple offer to all products", () => {
    const applySimpleOffer = new ApplySimpleOffer();

    const items: string[] = ["Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [
      { discount: 0.1, productName: "Arroz" },
      { discount: 0.1, productName: "Feijao" },
    ];

    const discount = applySimpleOffer.execute(order, offers);

    expect(discount).toBe(3);
  });

  it("should not apply offers if there is no offer", () => {
    const applySimpleOffer = new ApplySimpleOffer();

    const items: string[] = ["Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [];

    const discount = applySimpleOffer.execute(order, offers);

    expect(discount).toBe(0);
  });

  it("should not apply offers if there is no product with offers", () => {
    const applySimpleOffer = new ApplySimpleOffer();

    const items: string[] = ["Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);

    const offers: Offer[] = [{ discount: 0.1, productName: "Macarrão" }];

    const discount = applySimpleOffer.execute(order, offers);

    expect(discount).toBe(0);
  });
});
