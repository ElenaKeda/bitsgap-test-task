import { Switch } from "shared/components/Switch/Switch";
import styles from "./TakeProfitHeader.module.scss";
import { observer } from "mobx-react";
import { useStore } from "PlaceOrder/context";
import { QuestionTooltip } from "shared/components/QuestionTooltip/QuestionTooltip";

const TakeProfitHeader = observer(() => {
  const { isCheckedTakeProfit, setSwitchTakeProfit } = useStore();

  return (
    <div className={styles.switchBlock}>
      <div className={styles.label}>
        <QuestionTooltip message="Take Profit description" />
        {""}Take Profit
      </div>

      <Switch
        checked={isCheckedTakeProfit}
        onChange={(checked) => setSwitchTakeProfit(checked)}
      />
    </div>
  );
});

export { TakeProfitHeader };
