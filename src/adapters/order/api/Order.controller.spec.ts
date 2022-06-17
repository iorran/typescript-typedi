import { OrderEvent } from "../../../core/entity/OrderEvent";
import { ApplyComplexOffer } from "../../../core/usecase/offer/ApplyComplexOffer.service";
import { ApplySimpleOffer } from "../../../core/usecase/offer/ApplySimpleOffer.service";
import { FindActiveOffersService } from "../../../core/usecase/offer/FindActiveOffers.service";
import { ApplyOfferService } from "../../../core/usecase/offer/OfferApplier.service";
import { CreateOrderService } from "../../../core/usecase/order/CreateOrder.service";
import { FindAvailableProductsService } from "../../../core/usecase/product/FindAvailableProducts.service";
import { InMemoryOfferRepository } from "../../offer/repository/InMemoryOffer.repository";
import { InMemoryProductRepository } from "../../product/repository/InMemoryProduct.repository";
import { OrderController } from "./Order.controller";

jest.mock("../../../core/entity/OrderEvent");

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
const createOrderService = new CreateOrderService(
  mockFindAvailableProductsService,
  mockApplyOfferService
);

describe("Order", () => {
  it("should throw error when trying to create an order with invalid products", () => {
    const mock = jest.fn().mockReturnValue("worked");
    OrderEvent.getInstance = mock;

    const orderController = new OrderController(createOrderService);

    orderController.createOrder("             ");

    expect(mock).not.toHaveBeenCalled();
  });

  it("should throw error when trying to create an order with invalid products", () => {
    const mock = jest.fn().mockReturnValue("worked");
    OrderEvent.getInstance = mock;

    const orderController = new OrderController(createOrderService);

    orderController.createOrder("");

    expect(mock).not.toHaveBeenCalled();
  });

  it("should print order when has valid input", () => {
    const mock = jest.fn().mockReturnValue("worked");
    OrderEvent.getInstance = mock;

    const orderController = new OrderController(createOrderService);

    orderController.createOrder("Apples");

    expect(mock).toHaveBeenCalled();
  });
});
