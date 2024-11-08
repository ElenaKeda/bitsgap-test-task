import { observer } from "mobx-react";
import { FormControl, Input, InputAdornment, Typography } from "@mui/material";
import styles from "./TakeProfitTable.module.scss";
import { useStore } from "PlaceOrder/context";
import { DeleteIcon } from "shared/components/DeleteIcon/DeleteIcon";
import { TakeProfitTargetType } from "PlaceOrder/model";
import { AddTakeProfitButton } from "../AddTakeProfitButton/AddTakeProfitButton";
import { ErrorField } from "../ErorrField/ErrorField";
import classNames from "classnames";

const TableDataRow = observer(
  ({ data, index }: { data: TakeProfitTargetType; index: number }) => {
    const { deleteTakeProfitTarget, editTakeProfitTarget } = useStore();

    return (
      <div className={styles.body}>
        <div className={styles.cell}>
          <FormControl variant="standard" sx={{ width: "39px" }}>
            <Input
              id="profit"
              disableUnderline={true}
              className={classNames(styles.cellText, styles.mainTextColor)}
              value={data.profit}
              onChange={(e) =>
                editTakeProfitTarget(index, "profit", e.target.value)
              }
              endAdornment={
                <InputAdornment position="end">
                  <Typography
                    className={classNames(
                      styles.cellText,
                      styles.infoTextColor
                    )}
                  >
                    %
                  </Typography>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className={styles.cell}>
          <FormControl
            variant="standard"
            sx={{ width: "85px", marginLeft: "11px" }}
          >
            <Input
              fullWidth={false}
              id="targetPrice"
              disableUnderline={true}
              className={classNames(styles.cellText, styles.mainTextColor)}
              value={data.targetPrice}
              onChange={(e) =>
                editTakeProfitTarget(index, "targetPrice", e.target.value)
              }
              endAdornment={
                <InputAdornment position="end">
                  <Typography
                    className={classNames(
                      styles.cellText,
                      styles.infoTextColor
                    )}
                  >
                    USDT
                  </Typography>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className={styles.cell}>
          <FormControl variant="standard" sx={{ width: "85px" }}>
            <Input
              fullWidth={false}
              id="amountToSell"
              disableUnderline={true}
              className={classNames(styles.cellText, styles.mainTextColor)}
              value={data.amountToSell}
              onChange={(e) =>
                editTakeProfitTarget(index, "amountToSell", e.target.value)
              }
              endAdornment={
                <InputAdornment position="end" className={styles.cell}>
                  <Typography
                    className={classNames(
                      styles.cellText,
                      styles.infoTextColor
                    )}
                  >
                    %
                  </Typography>
                  <Typography
                    onClick={() => deleteTakeProfitTarget(index)}
                    style={{ width: "40px" }}
                    className={styles.closeButton}
                  >
                    <DeleteIcon />
                  </Typography>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    );
  }
);

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
