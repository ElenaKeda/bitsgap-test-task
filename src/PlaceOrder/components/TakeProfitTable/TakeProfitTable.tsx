import { observer } from "mobx-react";
import { Typography } from "@mui/material";
import styles from "./TakeProfitTable.module.scss";
import { useStore } from "PlaceOrder/context";
import { DeleteIcon } from "shared/components/DeleteIcon/DeleteIcon";
import { TakeProfitTargetType } from "PlaceOrder/model";

const TableDataRow = observer(
  ({ data, index }: { data: TakeProfitTargetType; index: number }) => {
    const { deleteTakeProfitTarget } = useStore();

    return (
      <div className={styles.body}>
        <div className={styles.cell}>
          <Typography style={{ width: "29px" }} className={styles.cellTextLeft}>
            {data.profit}
          </Typography>
          <Typography
            style={{ width: "10px" }}
            className={styles.cellTextRight}
          >
            {"%"}
          </Typography>
        </div>

        <div className={styles.cell}>
          <Typography style={{ width: "45px" }} className={styles.cellTextLeft}>
            {data.targetPrice}
          </Typography>
          <Typography
            style={{ width: "40px" }}
            className={styles.cellTextRight}
          >
            {"USDT"}
          </Typography>
        </div>

        <div className={styles.cell}>
          <Typography style={{ width: "27px" }} className={styles.cellTextLeft}>
            {data.amountToSell}
          </Typography>
          <Typography
            style={{ width: "10px" }}
            className={styles.cellTextRight}
          >
            {"%"}
          </Typography>
          <Typography
            onClick={() => deleteTakeProfitTarget(index)}
            style={{ width: "46px" }}
            className={styles.closeButton}
          >
            <DeleteIcon />
          </Typography>
        </div>
      </div>
    );
  }
);

const TakeProfitTable = observer(() => {
  const { takeProfitTargets, isCheckedTakeProfit } = useStore();

  if (!isCheckedTakeProfit) return null;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <Typography className={styles.headerText}>Profit</Typography>
        <Typography className={styles.headerText}>Target price</Typography>
        <Typography className={styles.headerText}>Amount to sell</Typography>
      </div>

      {takeProfitTargets.map((target, index) => (
        <TableDataRow data={target} index={index} key={index} />
      ))}
    </div>
  );
});

export { TakeProfitTable };