import { observable, computed, action, makeObservable, reaction } from "mobx";

import type { ErrorType, OrderSide, TakeProfitTargetType } from "../model";

const defaultTakeProfitTarget: TakeProfitTargetType[] = [
  { profit: 2, targetPrice: 0, amountToSell: 100 },
];

export class PlaceOrderStore {
  constructor() {
    makeObservable(this);

    reaction(
      () => this.activeOrderSide,
      () => {
        this.calculateTakeProfitTarget(null);
      }
    );

    reaction(
      () => this.price,
      () => {
        this.calculateTakeProfitTarget(this.takeProfitTargets.length - 1);
      }
    );
  }

  @observable activeOrderSide: OrderSide = "buy";
  @observable price = 0;
  @observable amount = 0;
  @observable isCheckedTakeProfit = false;
  @observable takeProfitTargets: TakeProfitTargetType[] =
    defaultTakeProfitTarget;
  @observable error: ErrorType = { isShowError: false, message: "" };

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

  @computed get totalProfitTargets(): number {
    return this.projectedProfitTargets.reduce((acc, cur) => acc + cur, 0) || 0;
  }

  public getTargetPrice = (profit: number) =>
    this.activeOrderSide === "buy"
      ? this.getTargetPriceBuy(profit)
      : this.getTargetPriceSell(profit);

  public getTargetPriceBuy = (profit: number) =>
    +(this.price * (1 + profit / 100)).toFixed(1);

  public getTargetPriceSell = (profit: number) =>
    +(this.price * (1 - profit / 100)).toFixed(1);

  public getProfitBuy = (target: TakeProfitTargetType) =>
    +(target.amountToSell * (target.targetPrice - this.price)).toFixed(2);

  public getProfitSell = (target: TakeProfitTargetType) =>
    +(target.amountToSell * (this.price - target.targetPrice)).toFixed(2);

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
  public setError = (error: ErrorType) => {
    this.error = error;
  };

  @action
  public deleteTakeProfitTarget = (index: number) => {
    this.takeProfitTargets = this.takeProfitTargets.filter(
      (_, i) => i !== index
    );

    this.balanceAmountToSell();
  };

  @action
  private calculateTakeProfitTarget = (index: number | null) => {
    this.takeProfitTargets = this.takeProfitTargets.map((item, i) => {
      if (i === index || index === null) {
        return {
          ...item,
          targetPrice: this.getTargetPrice(item.profit),
        };
      }

      return item;
    });
  };

  @action
  public editTakeProfitTarget = (
    index: number,
    propName: keyof TakeProfitTargetType,
    value: string
  ) => {
    this.takeProfitTargets = this.takeProfitTargets.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [propName]: +value,
        };
      }

      return item;
    });
  };

  @action
  public addNewTakeProfitTarget = () => {
    const lastTarget =
      this.takeProfitTargets[this.takeProfitTargets.length - 1];
    const newProfit = lastTarget ? lastTarget.profit + 2 : 2;
    const newAmountToSell = 20;

    const newTarget: TakeProfitTargetType = {
      profit: newProfit,
      targetPrice: this.getTargetPrice(newProfit),
      amountToSell: newAmountToSell,
    };

    this.takeProfitTargets.push(newTarget);

    this.balanceAmountToSell();
  };

  @action
  public balanceAmountToSell = () => {
    const totalAmount = this.takeProfitTargets.reduce(
      (sum, target) => sum + target.amountToSell,
      0
    );

    if (totalAmount === 100) return;

    const excessAmount = totalAmount - 100;

    this.takeProfitTargets = this.takeProfitTargets.map((target, index) => {
      if (target.amountToSell > 20) {
        return { ...target, amountToSell: target.amountToSell - excessAmount };
      }
      if (target.amountToSell === 20 && index === 0) {
        return { ...target, amountToSell: target.amountToSell - excessAmount };
      }
      return target;
    });
  };
}
