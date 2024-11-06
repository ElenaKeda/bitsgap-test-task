export type OrderSide = "buy" | "sell";

export type TakeProfitTargetType = {
  profit: number;
  targetPrice: number;
  amountToSell: number;
};
