import { observable, computed, action, makeObservable, reaction } from "mobx";

import type { OrderSide, TakeProfitTargetType } from "../model";

export class PlaceOrderStore {
  constructor() {
    makeObservable(this);

    reaction(
      () => this.isCheckedTakeProfit,
      (checked) => {
        checked &&
          this.calculateCurrentTakeProfitTarget(
            this.takeProfitTargets.length - 1
          );
      }
    );

    reaction(
      () => this.activeOrderSide,
      () => {
        this.calculateCurrentTakeProfitTarget(
          this.takeProfitTargets.length - 1
        );
      }
    );

    reaction(
      () => this.price,
      () => {
        this.calculateCurrentTakeProfitTarget(
          this.takeProfitTargets.length - 1
        );
      }
    );
  }

  @observable activeOrderSide: OrderSide = "buy";
  @observable price = 0;
  @observable amount = 0;
  @observable isCheckedTakeProfit = false;

  // TODO replace to localStorage
  @observable takeProfitTargets: TakeProfitTargetType[] = [
    { profit: 2, targetPrice: 0, amountToSell: 100 },
    // { profit: 4, targetPrice: 30692.9, amountToSell: 20 },
    // { profit: 6, targetPrice: 31692.9, amountToSell: 20 },
    // { profit: 8, targetPrice: 31692.9, amountToSell: 20 },
    // { profit: 9, targetPrice: 31692.9, amountToSell: 22 },
  ];

  @computed get total(): number {
    return this.price * this.amount;
  }

  @computed get projectedProfitTargets(): number[] {
    return this.takeProfitTargets.reduce((acc, cur) => {
      acc.push(
        this.activeOrderSide === "buy"
          ? this.getProfitBuy(cur)
          : this.getProfitSell(cur)
      );
      return acc;
    }, [] as number[]);
  }

  public getTargetPrice = (profit: number) =>
    this.activeOrderSide === "buy"
      ? this.getTargetPriceBuy(profit)
      : this.getTargetPriceSell(profit);

  public getTargetPriceBuy = (profit: number) =>
    this.price * (1 + profit / 100);

  public getTargetPriceSell = (profit: number) =>
    this.price * (1 - profit / 100);

  public getProfitBuy = (target: TakeProfitTargetType) =>
    target.amountToSell * (target.targetPrice - this.price);

  public getProfitSell = (target: TakeProfitTargetType) =>
    target.amountToSell * (this.price - target.targetPrice);

  @computed get totalProfitTargets(): number {
    return this.projectedProfitTargets.reduce((acc, cur) => acc + cur, 0) || 0;
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
    this.takeProfitTargets = this.takeProfitTargets.filter(
      (_, i) => i !== index
    );
  };

  @action
  public calculateCurrentTakeProfitTarget = (index: number) => {
    this.takeProfitTargets = this.takeProfitTargets.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          targetPrice: this.getTargetPrice(2),
        };
      }
      return item;
    });
  };
}
