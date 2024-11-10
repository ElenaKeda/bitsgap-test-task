import { observer } from "mobx-react";

import { QuestionTooltip } from "shared/components/QuestionTooltip/QuestionTooltip";
import { Button } from "shared/components/Button/Button";
import { NumberInput } from "shared/components/NumberInput/NumberInput";

import {
  BASE_CURRENCY,
  ERROR_GREATER_PREVIOUS,
  ERROR_GREATER_ZERO,
  ERROR_MAX,
  ERROR_MIN,
  getErrorDecreaseBy,
  getErrorIncreaseBy,
  QUOTE_CURRENCY,
} from "./constants";
import { useStore } from "./context";
import { PlaceOrderTypeSwitch } from "./components/PlaceOrderTypeSwitch/PlaceOrderTypeSwitch";
import { TakeProfit } from "./components/TakeProfit/TakeProfit";

import styles from "./PlaceOrderForm.module.scss";

export const PlaceOrderForm = observer(() => {
  const {
    activeOrderSide,
    price,
    total,
    amount,
    setPrice,
    setAmount,
    setTotal,
    setOrderSide,
    takeProfitTargets,
    setError,
  } = useStore();

  const validateForm = () => {
    let totalProfit = 0;
    let totalAmount = 0;

    for (let i = 0; i < takeProfitTargets.length; i++) {
      const { profit, targetPrice, amountToSell } = takeProfitTargets[i];

      // condition 2: Сумма значений инпутов Profit не должна превышать 500%
      totalProfit += Number(profit);
      totalAmount += Number(amountToSell);

      if (totalProfit > 500) {
        setError({ isShowError: true, message: ERROR_MAX });

        return false;
      }

      // condition 3: Profit >= 0.01
      if (Number(profit) < 0.01) {
        setError({ isShowError: true, message: ERROR_MIN });

        return false;
      }

      // condition 4: Текущий Profit должен быть больше предыдущего
      if (i > 0 && Number(profit) <= Number(takeProfitTargets[i - 1].profit)) {
        setError({ isShowError: true, message: ERROR_GREATER_PREVIOUS });

        return false;
      }

      // condition 5: Target price > 0
      if (Number(targetPrice) <= 0) {
        setError({ isShowError: true, message: ERROR_GREATER_ZERO });

        return false;
      }
    }

    if (totalAmount > 100) {
      setError({
        isShowError: true,
        message: getErrorDecreaseBy(totalAmount, totalAmount - 100),
      });

      return false;
    } else if (totalAmount < 100) {
      setError({
        isShowError: true,
        message: getErrorIncreaseBy(totalAmount, 100 - totalAmount),
      });

      return false;
    }

    setError({
      isShowError: false,
      message: null,
    });

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Sending data to the server or other logic after successful validation
      console.log("Form submitted successfully");
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.label}>
        Market direction{" "}
        <QuestionTooltip message="Market direction description" />
      </div>
      <div className={styles.content}>
        <div className={styles.typeSwitch}>
          <PlaceOrderTypeSwitch
            activeOrderSide={activeOrderSide}
            onChange={setOrderSide}
          />
        </div>
        <NumberInput
          label={`Price, ${QUOTE_CURRENCY}`}
          value={price}
          onChange={(value) => setPrice(Number(value))}
        />
        <NumberInput
          value={amount}
          label={`Amount, ${BASE_CURRENCY}`}
          onChange={(value) => setAmount(Number(value))}
        />
        <NumberInput
          value={total}
          label={`Total, ${QUOTE_CURRENCY}`}
          onChange={(value) => setTotal(Number(value))}
        />
        <TakeProfit />
        <div className={styles.submit}>
          <Button
            color={activeOrderSide === "buy" ? "green" : "red"}
            type="submit"
            fullWidth
          >
            {activeOrderSide === "buy"
              ? `Buy ${BASE_CURRENCY}`
              : `Sell ${QUOTE_CURRENCY}`}
          </Button>
        </div>
      </div>
    </form>
  );
});
