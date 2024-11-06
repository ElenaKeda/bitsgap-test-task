import styles from "./TakeProfit.module.scss";
import { observer } from "mobx-react";
import { TakeProfitHeader } from "../TakeProfitHeader/TakeProfitHeader";

const TakeProfit = observer(() => {
  return (
    <div className={styles.root}>
      <TakeProfitHeader />
    </div>
  );
});

export { TakeProfit };
