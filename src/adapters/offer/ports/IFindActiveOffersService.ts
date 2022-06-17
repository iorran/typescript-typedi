import { Offer } from "../../../core/entity/Offer";

export interface IFindActiveOffersService {
  execute(products: string[]): Offer[];
}
