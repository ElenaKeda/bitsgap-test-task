import { observer } from "mobx-react";
import { Typography } from "@mui/material";
import styles from "./TakeProfitTable.module.scss";
import { useStore } from "PlaceOrder/context";
import { AddTakeProfitButton } from "../AddTakeProfitButton/AddTakeProfitButton";
import { ErrorField } from "../ErorrField/ErrorField";
import classNames from "classnames";
import { TableDataRow } from "./TableDataRow";

const TakeProfitTable = observer(() => {
  const {
    activeOrderSide,
    takeProfitTargets,
    isCheckedTakeProfit,
    totalProfitTargets,
  } = useStore();

  if (!isCheckedTakeProfit) return null;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <Typography
          className={classNames(styles.cellText, styles.infoTextColor)}
        >
          Profit
        </Typography>
        <Typography
          className={classNames(styles.cellText, styles.infoTextColor)}
        >
          Target price
        </Typography>
        <Typography
          className={classNames(styles.cellText, styles.infoTextColor)}
        >
          {activeOrderSide === "buy" ? "Amount to sell" : "Amount to buy"}
        </Typography>
      </div>

      {takeProfitTargets.map((target, index) => (
        <TableDataRow data={target} index={index} key={index} />
      ))}

      <ErrorField />

      <AddTakeProfitButton />

      <div className={styles.profitPanel}>
        <Typography className={styles.profit}>Projected profit</Typography>

        <div className={styles.amountBlock}>
          <Typography className={styles.amount}>
            {totalProfitTargets}
          </Typography>
          <Typography className={styles.profit}>&nbsp;USDT</Typography>
        </div>
      </div>
    </div>
  );
});

export { TakeProfitTable };
