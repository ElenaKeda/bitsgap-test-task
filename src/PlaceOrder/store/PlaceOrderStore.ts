import { observable, computed, action, makeObservable } from "mobx";

import type { OrderSide, TakeProfitTargetType } from "../model";

export class PlaceOrderStore {
  constructor() {
    makeObservable(this);
  }

  @observable activeOrderSide: OrderSide = "buy";
  @observable price = 0;
  @observable amount = 0;
  @observable isCheckedTakeProfit = false;

  // TODO replace to localStorage
  @observable takeProfitTargets: TakeProfitTargetType[] = [
    { profit: 2, targetPrice: 30392.9, amountToSell: 40 },
    { profit: 4, targetPrice: 30692.9, amountToSell: 20 },
    { profit: 6, targetPrice: 31692.9, amountToSell: 20 },
    { profit: 8, targetPrice: 31692.9, amountToSell: 20 },
  ];


  @computed get total(): number {
    return this.price * this.amount;
  }

  @action
  public setOrderSide = (side: OrderSide) => {
    this.activeOrderSide = side;
  };

  @action
  public setPrice = (price: number) => {
    this.price = price;
  };

  @action
  public setAmount = (amount: number) => {
    this.amount = amount;
  };

  @action
  public setTotal = (total: number) => {
    this.amount = this.price > 0 ? total / this.price : 0;
  };

  @action
  public setSwitchTakeProfit = (flag: boolean) => {
    this.isCheckedTakeProfit = flag;
  };

  @action
  public deleteTakeProfitTarget = (index: number) => {
    this.takeProfitTargets = this.takeProfitTargets.filter((_, i) => i !== index);
  };

}
