import { InMemoryOfferRepository } from "../../../adapters/offer/repository/InMemoryOffer.repository";
import { NoProductsInStock } from "../../../adapters/order/errors/NoProductsInStock.error";
import { InMemoryProductRepository } from "../../../adapters/product/repository/InMemoryProduct.repository";
import { ApplyComplexOffer } from "../offer/ApplyComplexOffer.service";
import { ApplySimpleOffer } from "../offer/ApplySimpleOffer.service";
import { FindActiveOffersService } from "../offer/FindActiveOffers.service";
import { ApplyOfferService } from "../offer/OfferApplier.service";
import { FindAvailableProductsService } from "../product/FindAvailableProducts.service";
import { CreateOrderService } from "./CreateOrder.service";

const mockInMemoryProductRepository = new InMemoryProductRepository();
const mockFindAvailableProductsService = new FindAvailableProductsService(
  mockInMemoryProductRepository
);
const mockInMemoryOfferRepository = new InMemoryOfferRepository();
const mockFindActiveOffersService = new FindActiveOffersService(
  mockInMemoryOfferRepository
);
const mockApplySimpleOffer = new ApplySimpleOffer();
const mockApplyComplexOffer = new ApplyComplexOffer();
const mockApplyOfferService = new ApplyOfferService(
  mockFindActiveOffersService,
  mockApplySimpleOffer,
  mockApplyComplexOffer
);

describe("Order", () => {
  it("should throw error when trying to create an order with invalid products", () => {
    const createOrderService = new CreateOrderService(
      mockFindAvailableProductsService,
      mockApplyOfferService
    );

    expect(() => {
      createOrderService.execute(["Produto 1", "Produto 2", "Produto 3"]);
    }).toThrow(NoProductsInStock);
  });

  it("should be able to create an order", () => {
    const createOrderService = new CreateOrderService(
      mockFindAvailableProductsService,
      mockApplyOfferService
    );

    const order = createOrderService.execute(["Apples"]);
    expect(order).toEqual({
      orderItems: [{ product: { name: "Apples", price: 1 }, quantity: 1 }],
      subtotal: 1,
      total: 0.9,
    });
  });
});
