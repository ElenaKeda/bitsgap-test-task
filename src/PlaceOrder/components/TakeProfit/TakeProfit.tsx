import styles from "./TakeProfit.module.scss";
import { observer } from "mobx-react";
import { TakeProfitHeader } from "../TakeProfitHeader/TakeProfitHeader";
import { TakeProfitTable } from "../TakeProfitTable/TakeProfitTable";

const TakeProfit = observer(() => {
  return (
    <div className={styles.root}>
      <TakeProfitHeader />

      <TakeProfitTable />
    </div>
  );
});

export { TakeProfit };
