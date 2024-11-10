export const BASE_CURRENCY = "BTC";
export const QUOTE_CURRENCY = "USDT";
export const MAX_PROFIT_TARGETS = 5;

export const ERROR_MAX = "Maximum profit sum is 500%";
export const ERROR_MIN = "Minimum value is 0.01%";
export const ERROR_GREATER_PREVIOUS =
  "Each target's profit should be greater than the previous one";
export const ERROR_GREATER_ZERO = "Price must be greater than 0";

export const getErrorDecreaseBy = (amount: number, diff: number) =>
  `${amount} out of 100% selected. Please decrease by ${diff}`;

export const getErrorIncreaseBy = (amount: number, diff: number) =>
  `${amount} out of 100% selected. Please increase by ${diff}`;
