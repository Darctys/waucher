import {Injectable} from "@angular/core";
import {IOfferInterface} from "../interfaces/offer.interface";
import {FormModel} from "../forms-list/models/form-list.model";

@Injectable()
export class OffersService {
  public offerList: IOfferInterface[] = [];
  public formsLst: FormModel[] = []

  constructor() {

  }
  // public initOffers(): void{
  //   this.offerList = [
  //     {
  //       offerId: '24765878',
  //       title: 'Бесплатный завтрак',
  //       description: 'Для всех профсоюзников бесплатная пища с 9 до 11 утра в столовых УрФУ! С любовью, комбинат питания УрФУ!!!',
  //       activity: 'Халява',
  //       deliveryWay: 'Приди возьми',
  //       companyName: 'Столовка'
  //     },
  //     {
  //       offerId: '57765894',
  //       title: 'Юридичекая защита',
  //       description: 'Незаконное отчисление? Союз студентов всегда с тобой! Поможем в тяжелой ситуации!',
  //       activity: 'Халява',
  //       deliveryWay: 'Приди возьми',
  //       companyName: 'Столовка'
  //     },
  //   ];
  // }

  public addOffer(offer: IOfferInterface):void{
    this.offerList = [
      ...this.offerList,
      offer
    ];
  }

  public deleteOffer(offerId: string):void{
    this.offerList = this.offerList.filter(item => item.id !== offerId);
  }

  public getOffer(offerId: string): IOfferInterface {
    return this.offerList.find((x: IOfferInterface) => x.id === offerId)!
  }

  public editOffer(offer: IOfferInterface): void {
    this.offerList.forEach((x:IOfferInterface) => {
      if (x.id===offer.id){
        console.log(offer)
        Object.assign(x, offer)
      }
    })
  }
}
