import { Service } from "typedi";
import { IOfferApplierService } from "../../../adapters/offer/ports/IOfferApplierService";
import { Order } from "../../entity/Order";
import { ApplyComplexOffer } from "./ApplyComplexOffer.service";
import { ApplySimpleOffer } from "./ApplySimpleOffer.service";
import { FindActiveOffersService } from "./FindActiveOffers.service";

@Service()
export class ApplyOfferService implements IOfferApplierService {
  constructor(
    protected findActiveOffersService: FindActiveOffersService,
    protected applySimpleOfferService: ApplySimpleOffer,
    protected applyComplexOfferService: ApplyComplexOffer
  ) {}

  execute(order: Order): number {
    const offers = this.findActiveOffersService.execute(
      order.orderItems.map((item) => item.product.name)
    );

    if (!offers) {
      return order.total;
    }

    const simpleOffers = offers.filter(
      (offer) => !offer.quantity && !offer.affectedProductName
    );
    const complexOffers = offers.filter(
      (offer) => offer.quantity && offer.affectedProductName
    );

    let parcial = order.total;

    parcial =
      parcial - this.applySimpleOfferService.execute(order, simpleOffers);
    parcial =
      parcial - this.applyComplexOfferService.execute(order, complexOffers);

    return parcial;
  }
}
