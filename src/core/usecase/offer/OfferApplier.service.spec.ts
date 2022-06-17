import { InMemoryOfferRepository } from "../../../adapters/offer/repository/InMemoryOffer.repository";
import { Order } from "../../entity/Order";
import { Product } from "../../entity/Product";
import { ApplyComplexOffer } from "./ApplyComplexOffer.service";
import { ApplySimpleOffer } from "./ApplySimpleOffer.service";
import { FindActiveOffersService } from "./FindActiveOffers.service";
import { ApplyOfferService } from "./OfferApplier.service";

const inMemoryOfferRepository = new InMemoryOfferRepository();
const findActiveOffersService = new FindActiveOffersService(
  inMemoryOfferRepository
);
const applySimpleOffer = new ApplySimpleOffer();
const applyComplexOffer = new ApplyComplexOffer();

describe("OfferApplierService", () => {
  it("should create a cart with no offer", () => {
    const applyOfferService = new ApplyOfferService(
      findActiveOffersService,
      applySimpleOffer,
      applyComplexOffer
    );

    const items: string[] = ["Arroz", "Arroz", "Feijao"];
    const products: Product[] = [
      { name: "Arroz", price: 10 },
      { name: "Feijao", price: 20 },
    ];
    const order = new Order(items, products);
    expect(applyOfferService.execute(order)).toBe(40);
  });
});
