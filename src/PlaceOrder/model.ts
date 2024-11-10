export type OrderSide = "buy" | "sell";

export type TakeProfitTargetType = {
  profit: number;
  targetPrice: number;
  amountToSell: number;
};

export type ErrorType = { isShowError: boolean; message: string | null };
