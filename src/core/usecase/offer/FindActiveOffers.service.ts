import { Service } from "typedi";
import { IFindActiveOffersService } from "../../../adapters/offer/ports/IFindActiveOffersService";
import { InMemoryOfferRepository } from "../../../adapters/offer/repository/InMemoryOffer.repository";
import { Offer } from "../../entity/Offer";

@Service()
export class FindActiveOffersService implements IFindActiveOffersService {
  constructor(protected offerRepository: InMemoryOfferRepository) {}

  execute(productsNames: string[]): Offer[] {
    return this.offerRepository.findAllByProductNamesIn(productsNames);
  }
}
